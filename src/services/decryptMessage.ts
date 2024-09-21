import { invokeTauriCommand } from "./invokeTauriCommand";

export const decryptMessage = async (text: string): Promise<string> =>
  await invokeTauriCommand("decrypt", { text }).catch((error: any) =>
    console.error(error),
  );
