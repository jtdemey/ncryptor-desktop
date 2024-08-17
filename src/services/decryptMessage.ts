import { invokeTauriCommand } from "./invokeTauriCommand";

export const decryptMessage = async (input: string): Promise<string> =>
  await invokeTauriCommand("decrypt", { input }).catch((error: any) =>
    console.error(error),
  );
