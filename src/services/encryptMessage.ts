import { invokeTauriCommand } from "./invokeTauriCommand";

export const encryptMessage = async (sender: string, recipient: string, input: string): Promise<string> =>
  await invokeTauriCommand("encrypt", { sender, recipient, text: input }).catch((error: any) =>
    console.error(error),
  );
