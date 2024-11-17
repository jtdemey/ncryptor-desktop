import { invokeTauriCommand } from "./invokeTauriCommand";

export const deletePublicKey = async (fingerprint: string): Promise<string> =>
  await invokeTauriCommand("delete_public_key", { fingerprint }).catch((error: any) =>
    console.error(error),
  );
