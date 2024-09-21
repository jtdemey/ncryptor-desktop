// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::process::Command;

#[tauri::command]
fn decrypt(text: &str) -> String {
    match fs::write("d.txt.gpg", text) {
        Ok(file) => file,
        Err(error) => panic!("{}", error),
    };

    Command::new("gpg")
        .args([
            "--output",
            "d.txt",
            "--decrypt",
            "d.txt.gpg",
        ])
        .output()
        .expect("failed to decrypt string");

    let cat_output = Command::new("cat")
        .args([
            "d.txt",
        ])
        .output()
        .expect("failed to get file contents");

    match fs::remove_file("d.txt.gpg") {
        Ok(result) => result,
        Err(error) => panic!("{}", error),
    };
    match fs::remove_file("d.txt") {
        Ok(result) => result,
        Err(error) => panic!("{}", error),
    };

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
    match fs::write("m.txt", text) {
        Ok(file) => file,
        Err(error) => panic!("{}", error),
    };

    Command::new("gpg")
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

    let cat_output = Command::new("cat")
        .args([
            "m.txt.asc",
        ])
        .output()
        .expect("failed to get file contents");

    match fs::remove_file("m.txt") {
        Ok(result) => result,
        Err(error) => panic!("{}", error),
    };
    match fs::remove_file("m.txt.asc") {
        Ok(result) => result,
        Err(error) => panic!("{}", error),
    };

    return format!("{}", String::from_utf8_lossy(&cat_output.stdout));
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
