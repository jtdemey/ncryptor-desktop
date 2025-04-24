# Ncryptor Usage Guide
(WIP)

#### Contents
1. [Encrypt private messages](#encrypt-private-messages)
2. [Decrypt encrypted messages](#decrypt-private-messages)
3. [Generate keypairs](#generate-keypairs)
4. [Import a contact's public key](#import-a-contacts-public-key)
5. [Delete keys](#delete-keys)

## Encrypt private messages

*Ncryptor* allows you to encrypt private messages before they're sent over the wire. You'll need to have a private key capable of encryption. If you need to create one, head to [section 3](#generate-keypairs).

1. Ensure you're in the **Encrypt** view, available at any time by pressing the "Encrypt" button on the bottom navigation bar.
2. Select your User ID in the "From:" dropdown, and whoever you're sending the message to in the "To:" dropdown.
3. Enter your message into the text area.

![Pre-encryption screenshot](public/media/preencr.png "Pre-encryption")

4. Click "Encrypt" to encrypt the message using the recipient's public key.

![Post-encryption screenshot](public/media/postencr.png "Post-encryption")

## Decrypt encrypted messages
![Pre-decryption screenshot](public/media/predecr.png "Pre-decryption")
![Post-decryption screenshot](public/media/postdecr.png "Post-decryption")

## Generate keypairs
![Key generation](public/media/generate.png "Generate key")

## Import a contact's public key
![Public key import screenshot](public/media/import.png "Public key import")

## Delete keys
