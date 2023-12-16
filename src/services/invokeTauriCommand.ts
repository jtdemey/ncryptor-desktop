import { invoke } from "@tauri-apps/api/tauri";

export const invokeTauriCommand = async (
  commandName: string,
  params: any = {},
): Promise<any> =>
  invoke(commandName, params).catch((error: any) =>
    console.error(`Failed to invoke command ${commandName}`, error),
  );
