import { invokeTauriCommand } from "./invokeTauriCommand";

export const generateSubkey = async (
  parentFingerprint: string,
  algorithm: string,
  capabilities: string,
  expiration: string,
): Promise<string> =>
  invokeTauriCommand("generate_subkey", {
    parentFingerprint,
    algorithm,
    capabilities,
    expiration,
  }).catch((error: any) => console.error(error));
