import { invokeTauriCommand } from "./invokeTauriCommand";

export const encryptMessage = async (input: string): Promise<string> =>
  await invokeTauriCommand("encrypt", { input }).catch((error: any) =>
    console.error(error),
  );
