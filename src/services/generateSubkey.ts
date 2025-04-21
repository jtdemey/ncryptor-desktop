import { invokeTauriCommand } from "./invokeTauriCommand";

const ENCRYPTION_REPLACEMENTS = {
  ed25519: "cv25519",
};

export const generateSubkey = async (
  parentFingerprint: string,
  algorithm: string,
  capabilities: string,
  expiration: string,
): Promise<string> => {
  if (capabilities === "encr") {
    Object.keys(ENCRYPTION_REPLACEMENTS).forEach(algo => {
      if (algo === algorithm) {
        algorithm = ENCRYPTION_REPLACEMENTS[algo];
      }
    });
  }
  return invokeTauriCommand("generate_subkey", {
    parentFingerprint,
    algorithm,
    capabilities,
    expiration,
  }).catch((error: any) => console.error(error));
};
