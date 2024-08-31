import { invokeTauriCommand } from "./invokeTauriCommand";

export const deletePublicKey = async (input: string): Promise<string> =>
  await invokeTauriCommand("delete_public_key", { input }).catch((error: any) =>
    console.error(error),
  );
