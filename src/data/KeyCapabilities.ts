/*
From GPG's DETAILS

Field 12 - Key capabilities

The defined capabilities are:

e
    Encrypt
s
    Sign
c
    Certify
a
    Authentication
r
    Restricted encryption (subkey only use)
t
    Timestamping
g
    Group key
?
    Unknown capability

A key may have any combination of them in any order. In addition to these letters, the primary key has uppercase versions of the letters to denote the usable capabilities of the entire key, and a potential letter ‘D’ to indicate a disabled key.
*/

export const KeyCapabilities: { [key: string]: string } = {
  e: "Encrypt",
  s: "Sign",
  c: "Certify",
  a: "Authentication",
  r: "Restricted encryption (subkey only use)",
  t: "Timestamping",
  g: "Group key",
  "?": "Unknown capability",
};
