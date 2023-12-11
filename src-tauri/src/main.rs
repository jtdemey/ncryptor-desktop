// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn get_gpg_version(name_param: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name_param)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_gpg_version])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
