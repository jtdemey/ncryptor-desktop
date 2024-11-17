import { invokeTauriCommand } from "./invokeTauriCommand";

export const deletePrivateKey = async (fingerprint: string): Promise<string> =>
  await invokeTauriCommand("delete_private_key", { fingerprint }).catch((error: any) =>
    console.error(error),
  );
