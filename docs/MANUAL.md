# Ncryptor Usage Guide

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
1. Navigate to the the **Decrypt** view using the bottom navigation bar.
2. Copy and paste your encrypted text into the input, or click the file upload button to read the encrypted text from a file.
![Pre-decryption screenshot](public/media/predecr.png "Pre-decryption")

3. Click "Decrypt" and enter the password of your key into the prompt that appears.
![Post-decryption screenshot](public/media/postdecr.png "Post-decryption")

## Generate keypairs
1. Navigate to the the **Keyring** view using the bottom navigation bar.
2. Click the "Generate" button in the top left.
3. Enter a name to be associated with the key, and optionally an email and/or comment.
![Key generation](public/media/generate.png "Generate key")

4. Select your desired algorithm.
5. Optionally, you can expand the advanced options to configure the capabilities of your key and which subkeys, if any, you'd like to create.

Notes:
- The "Encrypt" capability includes the ability to decrypt messages as well.
- ED25519 is generally considered safer than RSA, but will require a CV25519 subkey for encryption and decryption.
- Both supported algorithms are considered safe, but will be deprecated in 2030 to adapt to quantum computing. GPG is considering standards like [ML-KEM](https://csrc.nist.gov/pubs/fips/203/final), and I intend to support such algorithms as they become available.
- For a simple private-public keypair, use `rsa4096` with all capabilities enabled and no subkeys.
- For a personal key intended for long-term use, use `ed25519` with only the capability to certify. Create subkeys for authentication, encryption, and signing.

## Import a contact's public key
1. Navigate to the the **Contacts** view using the bottom navigation bar.
2. Click the "New" button in the top left.
3. Copy and paste your contact's public key into the input, or click the file upload button to select the key from a file.
![Public key import screenshot](public/media/import.png "Public key import")

4. Click "Add".

## Delete keys
1. You can delete private or public keys. Find the key you want to delete and select it from either the **Keyring** view (for private keys) or the **Contacts** view (for public keys).
2. Scroll down to the bottom of the key's details and click the "Delete" button.
3. Confirm your intent to permanently delete the key in the modal that appears, or click "Cancel" to abort the operation.

Notes:
- Deleting a parent key will delete its subkeys. In the Keyring and Contacts views, subkeys are grouped more closely with their sibling and parent keys, with the parent key on the top.
