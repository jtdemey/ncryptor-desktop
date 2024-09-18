// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::process::Command;

#[tauri::command]
fn decrypt(recipient: String) -> String {
    let output = Command::new("gpg")
        .args([
            "--decrypt",
            "--default-key",
            &recipient,
            "--armor",
            "--trust-model",
            "always"
        ])
        .output()
        .expect("failed to decrypt string");
    return format!("{}", String::from_utf8_lossy(&output.stdout));
}

#[tauri::command]
fn delete_private_key(user_name: String) -> String {
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
fn delete_public_key(user_name: String) -> String {
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
fn encrypt(sender: String, recipient: String, text: &str) -> String {
    let file_write_result = fs::write("foo.txt", text);
    let written_file = match file_write_result {
        Ok(file) => println!("ahoy!"),
        Err(error) => println!("glorp"),
    };
    let output = Command::new("gpg")
        .args([
            "--encrypt",
            "--default-key",
            &sender,
            "--recipient",
            &recipient,
            "--armor",
            "--trust-model",
            "always"
        ])
        .output()
        .expect("failed to encrypt string");
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            decrypt,
            delete_private_key,
            delete_public_key,
            encrypt,
            get_gpg_version,
            get_private_keys,
            get_public_keys
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
