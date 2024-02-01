import { invokeTauriCommand } from "./invokeTauriCommand";
import { parseKeyList } from "../utils/KeyListParser";
import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";

export type GetPrivateKeysResponse = {
  status: number;
  keys: (PrivateKey | PublicKey)[];
};

export const getPrivateKeys = async (): Promise<GetPrivateKeysResponse> => {
  const output: string = await invokeTauriCommand("get_private_keys").catch(
    (error: any) => console.error(error),
  );
  return {
    status: 200,
    keys: output ? parseKeyList(output) : [],
  };
};
