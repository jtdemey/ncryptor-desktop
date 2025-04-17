/*
  From GPG's DETAILS

9.1.  Public-Key Algorithms

      ID           Algorithm
      --           ---------
      1          - RSA (Encrypt or Sign) [HAC]
      2          - RSA Encrypt-Only [HAC]
      3          - RSA Sign-Only [HAC]
      16         - Elgamal (Encrypt-Only) [ELGAMAL] [HAC]
      17         - DSA (Digital Signature Algorithm) [FIPS186] [HAC]
      18         - Reserved for Elliptic Curve
      19         - Reserved for ECDSA
      20         - Reserved (formerly Elgamal Encrypt or Sign)
      21         - Reserved for Diffie-Hellman (X9.42,
                   as defined for IETF-S/MIME)
      100 to 110 - Private/Experimental algorithm

   Implementations MUST implement DSA for signatures, and Elgamal for
   encryption.  Implementations SHOULD implement RSA keys (1).  RSA
   Encrypt-Only (2) and RSA Sign-Only are deprecated and SHOULD NOT be
   generated, but may be interpreted.  See Section 13.5.  See Section
   13.8 for notes on Elliptic Curve (18), ECDSA (19), Elgamal Encrypt or
   Sign (20), and X9.42 (21).  Implementations MAY implement any other
   algorithm.
*/

const PRIVATE_EXPERIMENTAL_ALGORITHM = "Private/Experimental algorithm";

export const PublicKeyAlgorithms: { [key: string]: string } = {
  "1": "RSA (Encrypt or Sign) [HAC]",
  "2": "RSA Encrypt-Only [HAC]",
  "3": "RSA Sign-Only [HAC]",
  "16": "Elgamal (Encrypt-Only) [ELGAMAL] [HAC]",
  "17": "DSA (Digital Signature Algorithm) [FIPS186] [HAC]",
  "18": "Elliptic Curve",
  "19": "ECDSA",
  "20": "Reserved (formerly Elgamal Encrypt or Sign)",
  "21": "Diffie-Hellman (X9.42, as defined for IETF-S/MIME)",
  "22": "EdDSA",
  "100": PRIVATE_EXPERIMENTAL_ALGORITHM,
  "101": PRIVATE_EXPERIMENTAL_ALGORITHM,
  "102": PRIVATE_EXPERIMENTAL_ALGORITHM,
  "103": PRIVATE_EXPERIMENTAL_ALGORITHM,
  "104": PRIVATE_EXPERIMENTAL_ALGORITHM,
  "105": PRIVATE_EXPERIMENTAL_ALGORITHM,
  "106": PRIVATE_EXPERIMENTAL_ALGORITHM,
  "107": PRIVATE_EXPERIMENTAL_ALGORITHM,
  "108": PRIVATE_EXPERIMENTAL_ALGORITHM,
  "109": PRIVATE_EXPERIMENTAL_ALGORITHM,
};
