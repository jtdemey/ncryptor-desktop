import { invokeTauriCommand } from "./invokeTauriCommand";
import { parseKeyList } from "../utils/KeyListParser";
import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";

export type GetPublicKeysResponse = {
  status: number;
  keys: (PrivateKey | PublicKey)[];
};

export const getPublicKeys = async (): Promise<GetPublicKeysResponse> => {
  const output: string = await invokeTauriCommand("get_public_keys").catch(
    (error: any) => console.error(error),
  );
  const parsedKeys = parseKeyList(output);
  return {
    status: 200,
    keys: parsedKeys,
  };
};
