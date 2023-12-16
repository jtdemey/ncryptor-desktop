import { KeysResponse } from "../utils/ResponseParsers";
import { invokeTauriCommand } from "./invokeTauriCommand";

export const getPrivateKeys = async (): Promise<KeysResponse> => {
  const output: string = await invokeTauriCommand("get_private_keys").catch(
    (error: any) => console.error(error),
  );
  return {
    status: 200,
    keys: output,
  };
};
