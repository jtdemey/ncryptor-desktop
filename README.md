# Ncryptor Desktop

Ncryptor Desktop is a simple, cross-platform program used to invoke the GNU Privacy Guard.

## Features

- Encrypt plain text messages or text files to anyone in your contacts
- Decrypt messages encrypted just for you
- Browse the details of the private and public RSA keys in your GPG keyring
- Generate new RSA keypairs for encryption
- Easily import public PGP keys into your keyring
- Delete keys (with clear confirmation required)

![Ncryptor screenshot](public/media/screencap.png "Screenshot of Ncryptor")

## Compatibility

Ncryptor Desktop runs on the following 64-bit operating systems using [Tauri](https://tauri.app/):

- Linux (.deb or .AppImage)
- Windows (at least version 8, .msi or .exe)
- macOS (.app or .dmg)

### Compiled Binaries
Debian and RHEL-based distributions of Linux can download `.deb` and `.rpm` files on the [Releases](https://github.com/jtdemey/ncryptor-desktop/releases) page.

## Requirements

- [GNU Privacy Guard (gpg)](https://www.gnupg.org/index.html) >= v2.3.4

## Installation and Running

Check Releases and download the installation file for platform of your choice.

## Security

Ncryptor Desktop is an entirely open-source web-based frontend that uses [Tauri](https://tauri.app/) to run as a native application outside of the browser.

Tauri uses [Microsoft Edge WebViews](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section).
