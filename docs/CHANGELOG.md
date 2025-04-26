# 0.7 (current)
- Encrypt messages using available GPG public keys
    - Supports importing a message from a text file
- Decrypt messages with a click if corresponding private key available
    - Supports importing a message from a text file
- List private keys (Keyring view)
- List public keys (Contacts view)
- View private and public key details, including:
    - Fingerprint
    - User IDs
    - Created date
    - Expiration date
    - Key type
    - Capabilities
    - Ability to view/copy full public keys
- Generate ED25519 and RSA keypairs
    - Selectable RSA size: 1024, 2048, and 4096
    - Supports comments
    - Supports expiration date
- Advanced options for subkey creation and capability customization
- Delete public and private keys with clear confirmation prompt
- Import public key (Add contact view)
    - Supports importing from key file

(future)

# 0.8
- Application icon
- Windows bugs
    - Hide key list's unscrollable scrollbars
    - Fix missing copyleft icon
    - Remove rectangular box shadow around radio buttons
    - Darken checkbox icons
- Loading screen during key generation
- Optional password field for skipping prompt during key generation
- Sort key list alphabetically after key generation
- Collapsible drawer for viewing additional User IDs if present in the key details view

# 0.9
- Choose gpg directory on launch
- Search keyring/contacts
- Prompt for deletion of related keys/subkeys on key delete modal
- Show revocation status
- Show icon if key currently off-drive

# 1.0
- Prompt mode: show command input before sending, allow modification
- Guide: doc explaining how to generate personal keys with higher granularity
- Info: supported algorithms
- Modal: x icon

# 1.1
- Themes
- Automatic base64 encoding for sharing images
