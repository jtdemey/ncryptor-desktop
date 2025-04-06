// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::Path;
use std::process::Command;

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
    let filesnames_to_delete = vec!["d.txt", "d.txt.gpg"];
    for f in &filesnames_to_delete {
        if Path::new(f).exists() {
            delete_file(f);
        }
    }

    write_file("d.txt.gpg", text);

    Command::new("gpg")
        .args(["--output", "d.txt", "--decrypt", "d.txt.gpg"])
        .output()
        .expect("failed to decrypt string");

    if !Path::new("d.txt").exists() {
        delete_file("d.txt.gpg");
        return "Unable to decrypt string: the corresponding secret key must be imported in your keyring.".to_string();
    }

    let cat_output = Command::new("cat")
        .args(["d.txt"])
        .output()
        .expect("failed to get file contents");

    delete_file("d.txt.gpg");
    delete_file("d.txt");

    return format!("{}", String::from_utf8_lossy(&cat_output.stdout));
}

#[tauri::command]
fn delete_private_key(fingerprint: &str) -> String {
    let output = Command::new("gpg")
        .args(["--batch", "--yes", "--delete-secret-key", &fingerprint])
        .output()
        .expect("failed to delete private key");
    return format!("{}", String::from_utf8_lossy(&output.stdout));
}

#[tauri::command]
fn delete_public_key(fingerprint: &str) -> String {
    let output = Command::new("gpg")
        .args(["--batch", "--yes", "--delete-key", &fingerprint])
        .output()
        .expect("failed to delete public key");
    return format!("{}", String::from_utf8_lossy(&output.stdout));
}

#[tauri::command]
fn encrypt(sender: &str, recipient: &str, text: &str) -> String {
    let filesnames_to_delete = vec!["m.txt", "m.txt.asc"];
    for f in &filesnames_to_delete {
        if Path::new(f).exists() {
            delete_file(f);
        }
    }

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
        return format!(
            "Unable to encrypt string: {}",
            String::from_utf8_lossy(&gpg_output.stderr)
        );
    }

    let cat_output = Command::new("cat")
        .args(["m.txt.asc"])
        .output()
        .expect("failed to get file contents");

    delete_file("m.txt");
    delete_file("m.txt.asc");

    return format!("{}", String::from_utf8_lossy(&cat_output.stdout));
}

#[tauri::command]
fn generate_keypair(algorithm: &str, expiration: &str, user_id: &str) -> String {
    let output = Command::new("gpg")
        .args([
            "--quick-gen-key",
            &user_id,
            algorithm,
            "auth,encr,sign",
            expiration,
        ])
        .output()
        .expect("failed to generate key");
    return format!("{}", String::from_utf8_lossy(&output.stdout));
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
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
