// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::io::{BufRead, BufReader, Write};
use std::path::Path;
use std::process::{Command, Stdio};
use std::sync::mpsc;
use std::thread;
use std::time::{Duration, Instant};


fn delete_file(file_name: &str) {
    match fs::remove_file(file_name) {
        Ok(result) => result,
        Err(error) => panic!("{}", error),
    };
}

fn write_file(file_name: &str, content: &str) {
    match fs::write(file_name, content) {
        Ok(file) => file,
        Err(error) => panic!("{}", error),
    };
}

#[tauri::command]
fn decrypt(text: &str) -> String {
    write_file("d.txt.gpg", text);

    Command::new("gpg")
        .args([
            "--output",
            "d.txt",
            "--decrypt",
            "d.txt.gpg",
        ])
        .output()
        .expect("failed to decrypt string");

    if !Path::new("d.txt").exists() {
        delete_file("d.txt.gpg");
        return "Unable to decrypt string: the corresponding secret key must be imported in your keyring.".to_string();
    }

    let cat_output = Command::new("cat")
        .args([
            "d.txt",
        ])
        .output()
        .expect("failed to get file contents");

    delete_file("d.txt.gpg");
    delete_file("d.txt");

    return format!("{}", String::from_utf8_lossy(&cat_output.stdout));
}

#[tauri::command]
fn delete_private_key(user_name: &str) -> String {
    let output = Command::new("gpg")
        .args([
            "--delete-secret-key",
            &user_name
        ])
        .output()
        .expect("failed to delete private key");
    return format!("{}", String::from_utf8_lossy(&output.stdout));
}

#[tauri::command]
fn delete_public_key(user_name: &str) -> String {
    let output = Command::new("gpg")
        .args([
            "--delete-key",
            &user_name
        ])
        .output()
        .expect("failed to delete public key");
    return format!("{}", String::from_utf8_lossy(&output.stdout));
}

#[tauri::command]
fn encrypt(sender: &str, recipient: &str, text: &str) -> String {
    write_file("m.txt", text);

    let gpg_output = Command::new("gpg")
        .args([
            "-e",
            "--default-key",
            &sender,
            "--recipient",
            &recipient,
            "--armor",
            "--trust-model",
            "always",
            "m.txt",
        ])
        .output()
        .expect("failed to encrypt string");

    if !Path::new("m.txt.asc").exists() {
        return format!("Unable to encrypt string: {}", String::from_utf8_lossy(&gpg_output.stderr));
    }

    let cat_output = Command::new("cat")
        .args([
            "m.txt.asc",
        ])
        .output()
        .expect("failed to get file contents");

    delete_file("m.txt");
    delete_file("m.txt.asc");

    return format!("{}", String::from_utf8_lossy(&cat_output.stdout));
}

struct CliResponse {
    timeout: Duration,
}

enum CliMessage {
    Command(String),
    Exit,
}

#[tauri::command]
fn generate_keypair(algorithm: &str, expiration: &str, user_id: &str) -> String {
    let (input_tx, input_rx) = mpsc::channel();
    let (output_tx, output_rx) = mpsc::channel();

    let handle = thread::spawn(move || {
        let mut gpg_command = Command::new("gpg")
            .args([
                "--expert",
                "--full-gen-key",
            ])
            .stdin(Stdio::piped())
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .spawn()
            .expect("Failed to spawn gpg thread");

        let mut stdin = gpg_command.stdin.take().expect("Failed to get gpg stdin");
        let stdout = gpg_command.stdout.take().expect("Failed to get gpg stdout");

        let output_tx_clone = output_tx.clone();
        thread::spawn(move || {
            let reader = BufReader::new(stdout);
            for line in reader.lines() {
                if let Ok(line) = line {
                    println!("spat {}", line);
                    output_tx_clone.send(line).expect("Failed to send output to channel")
                }
            }
        });

        while let Ok(message) = input_rx.recv() {
            match message {
                CliMessage::Command(input) => {
                    writeln!(stdin, "{}", input).expect("Failed to write to stdin");
                }
                CliMessage::Exit => break,
            }
        }

        gpg_command.wait().expect("gpg unexpectedly failed");
    });

    let send_command_and_wait = |command: &str, expected: CliResponse| -> Result<String, &'static str> {
        input_tx.send(CliMessage::Command(command.to_string()))
            .map_err(|_| "Failed to send command")?;

        let start = Instant::now();
        let mut accumulated_output = Vec::new();

        while let Ok(output) = output_rx.recv_timeout(expected.timeout) {
            accumulated_output.push(output.clone());
            return Ok(output);

            if start.elapsed() > expected.timeout {
                return Err("Timeout waiting for expected output");
            }
        }

        Err("No matching output received")
    };

    let inputs: [(&str, i32); 9] = [
        ("1", 5),
        ("4096", 5),
        ("4096", 5),
        ("1w", 5),
        ("y", 5),
        ("frank bean", 5),
        ("frank@bean.net", 5),
        ("yes", 5),
        ("O", 5),
    ];

    let commands = vec![
        ("1\n", CliResponse {
            timeout: Duration::from_secs(5),
        }),
        ("4096", CliResponse {
            timeout: Duration::from_secs(5),
        }),
        ("4096", CliResponse {
            timeout: Duration::from_secs(5),
        }),
    ];

    for (cmd, expected) in commands {
        match send_command_and_wait(cmd, expected) {
            Ok(output) => println!("Successfully received: {}", output),
            Err(e) => println!("Error: {}", e),
        }
    }

    // Clean up
    input_tx.send(CliMessage::Exit).unwrap();
    handle.join().unwrap();

    drop(input_tx);

    return "Success!".to_string();
}

#[tauri::command]
fn get_gpg_version() -> String {
    let output = Command::new("gpg")
        .arg("--version")
        .output()
        .expect("failed to get gpg version");
    return format!("{}", String::from_utf8_lossy(&output.stdout));
}

#[tauri::command]
fn get_private_keys() -> String {
    let output = Command::new("gpg")
        .args(["-K", "--with-colons"])
        .output()
        .expect("failed to get private keys output");
    return format!("{}", String::from_utf8_lossy(&output.stdout));
}

#[tauri::command]
fn get_public_keys() -> String {
    let output = Command::new("gpg")
        .args(["-k", "--with-colons"])
        .output()
        .expect("failed to get public keys output");
    return format!("{}", String::from_utf8_lossy(&output.stdout));
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            decrypt,
            delete_private_key,
            delete_public_key,
            encrypt,
            generate_keypair,
            get_gpg_version,
            get_private_keys,
            get_public_keys
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
