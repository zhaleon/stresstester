// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn create_cpp_file(contents: &str) -> Result<(), String> {
    use std::fs::File;
    use std::io::Write;

    // Create a cpp file with the provided contents
    let mut file = match File::create("temp.cpp") {
        Ok(f) => f,
        Err(e) => return Err(format!("Failed to create file: {}", e)),
    };

    // Write contents to the file
    if let Err(e) = file.write_all(contents.as_bytes()) {
        return Err(format!("Failed to write to file: {}", e));
    }
    format!("Created temp.cpp");
    Ok(())
}


#[tauri::command]
fn compile_cpp_file(path: &str) -> String {
    let output = if cfg!(target_os = "windows") {
        Command::new("cmd")
            .args(["/C", "echo hello"])
            .output()
    } else {
        Command::new("sh")
            .arg("-c")
            .arg("g++ -std=c++20")
            .arg(path)
            .output()
    };
    format!("Hello, {}! You've been greeted from Rust!", path)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
