# Ncryptor Desktop

Use public-key cryptography to send private, end-to-end encrypted messages over *any* application.

![Ncryptor screenshot](public/media/splash.png "Screenshot of Ncryptor")

Ncryptor Desktop is a simple, cross-platform program used to invoke the [GNU Privacy Guard](https://gnupg.org/). It uses [PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) to encrypt plain text messages that can be safely sent over any messaging platform.

## How it works

Let's say *Sly* wants to send *Bentley* an address to meet at.

**The setup**
1. They both download *Ncryptor* on their own machines, as well as their favorite unsecure messaging platform — say, [Discord](https://discordapp.com/).
2. They each generate a short-lived RSA keypair from the Keyring view.
3. Each RSA keypair has a **private key** and a **public key**. Sly and Bentley send each other their public keys over Discord.
4. They import each other's public keys from the Contacts view.

**Encrypted communication**
5. Sly types the address into the Encrypt view and clicks "Encrypt" to encrypt the text with Bentley's public key.
6. Sly sends the encrypted text to Bentley over Discord, who then pastes the text into his *Ncryptor*.
7. Bentley clicks "Decrypt" to view the address securely.

They can each repeat steps 5-7 each time they want to send a private message over the Internet.

View `docs/MANUAL.md` in this repository for more information about using *Ncryptor*.

## Features

- Encrypt plain text messages or text files to anyone in your contacts
- Decrypt encrypted messages
- Examine details of the PGP keys in your keyring and contacts
- Generate new ED25519 or RSA keypairs for encryption
- Easily import public PGP keys into your contacts
- Delete keys (with clear confirmation required)

## Requirements

- [GNU Privacy Guard (gpg)](https://www.gnupg.org/index.html) >= v2.3.4

Note: `gpg` may already be installed on your system. Try running Ncryptor first.

## Compatibility

Ncryptor Desktop runs on the following 64-bit operating systems using [Tauri](https://tauri.app/):

- Linux (.deb, .rpm, or .AppImage)
- Windows (at least version 8, .msi or .exe)
- macOS (.app or .dmg)*

*requires building from source

### Downloads

#### Debian-based (Ubuntu, Mint, etc.)
Download the `.deb` file on the [Releases](https://github.com/jtdemey/ncryptor-desktop/releases) page and install it like:
```
sudo dpkg -i ~/path/to/ncryptor-x.x.x_amd64.deb
```

#### RHEL and Fedora
Download the `.rpm` file on the [Releases](https://github.com/jtdemey/ncryptor-desktop/releases) page and install it like:
```
sudo dnf install ~/path/to/ncryptor-x.x.x_amd64.rpm
```

#### Windows
Download and run the `.msi` or `.exe` installer on the [Releases](https://github.com/jtdemey/ncryptor-desktop/releases) page and install it like:

## Building from source
You'll need [Node.js](https://nodejs.org/) >=v22.15.0 and [Rust](https://www.rust-lang.org/tools/install) installed on your system to build *Ncryptor*.

1. Clone this repository
```bash
git clone https://github.com/jtdemey/ncryptor-desktop.git
```

2. Install dependencies
```bash
npm i
```

3. Build the app
```bash
npm run tauri build
```

If successful, the compiled application's location will be printed in the output.

## Security

- Ncryptor Desktop is an open-source [React](https://react.dev/) frontend that uses [Tauri](https://tauri.app/) to run as a native application.
- Aside from anything that may be included in Tauri itself, this program doesn't have any telemetry nor does it make any HTTP requests.
- Tauri uses [Microsoft Edge WebViews](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section).

## Bug reporting
If you encounter a bug in *Ncyptor*, please [email me](https://johntorsten.com/contact) with steps to replicate the issue, as well as some general information about your setup, including your operating system.
