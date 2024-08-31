import { invokeTauriCommand } from "./invokeTauriCommand";

export const deletePrivateKey = async (input: string): Promise<string> =>
  await invokeTauriCommand("delete_private_key", { input }).catch((error: any) =>
    console.error(error),
  );
