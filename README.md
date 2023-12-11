# Ncryptor Desktop

**Work in progress**

Ncryptor Desktop is a simple, cross-platform program used to invoke the GNU Privacy Guard.
It is an easy way to encrypt confidential messages to others, decrypt messages to you, and manage your private and public RSA keypairs.
Plain text can be near-instantly encrypted and copied to the clipboard for quickly sending private messages through any instant messaging platform.
The only way to ensure true end-to-end encryption is by encrypting the text on your device before its sent over the wire, and Ncryptor streamlines this process while looking stylish.

![Ncryptor screenshot](public/media/screencap.png "Screenshot of Ncryptor")

## Compatibility

Ncryptor Desktop runs on the following 64-bit operating systems using [Tauri](https://tauri.app/):

- Windows (at least version 8, .msi or .exe) 
- macOS (.app or .dmg)
- Linux (.deb or .AppImage)

## Features

- Quickly encrypt plain text messages or text files to anyone with a public PGP key
- Near-instantly decrypt messages encrypted for you
- Browse the details of the private and public RSA keys in your GPG keyring
- Generate new RSA keypairs for encryption
- Easily import public PGP keys into your keyring
- Delete RSA keys (with clear confirmation required)

## Requirements

- [GNU Privacy Guard (gpg)](https://www.gnupg.org/index.html) >= v2.3.4

## Installation and Running

Check Releases and download the installation file for platform of your choice.

## Security

Ncryptor Desktop is an entirely open-source web-based frontend that uses [Tauri](https://tauri.app/) to run as a native application outside of the browser.

Tauri uses [Microsoft Edge WebViews](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section).
