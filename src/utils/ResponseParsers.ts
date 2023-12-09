import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";
import { KeypairColors } from "../data/KeypairColors";

export type KeysResponse = {
  status: number;
  keys: string;
};

const parseResponseBody = (keys: string): { keys: any[]; ringPath: string } => {
  const parsedKeys: any[] = [];
  const splitKeys = keys.split("\n");
  let keyColorIndex = 0;
  for (let i = 2; i < splitKeys.length; i++) {
    const metaLine = splitKeys[i].split(" ");
    if (metaLine[0] !== "sec" && metaLine[0] !== "pub") continue;
    const keyType = metaLine[3] || "unknown";
    const createdDate = metaLine[4] || "unknown";
    const fingerprint = splitKeys[i + 1]?.trim();
    const userIdLine = splitKeys[i + 2].split(" ");
    const userId = userIdLine[userIdLine.length - 1] || "unknown";
    const color = KeypairColors[keyColorIndex].value;
    keyColorIndex =
      keyColorIndex >= KeypairColors.length - 1 ? 0 : keyColorIndex + 1;
    parsedKeys.push({
      color,
      createdDate,
      fingerprint,
      keyType,
      userId
    });
    i += 3;
  }
  return {
    keys: parsedKeys,
    ringPath: splitKeys[0]
  };
};

const handleGetKeysResponse = (
  { status, keys }: KeysResponse,
  setErrorText: Function
): { keys: any[]; ringPath: string } => {
  if (status !== 200) {
    const errText = `Error ${status} getting private keys from keyring`;
    console.error(errText);
    setErrorText(errText);
  }
  if (!keys) {
    return { ringPath: "N/A", keys: [] };
  }
  const parsedKeys = parseResponseBody(keys);
  return {
    keys: sortKeysByUserId(parsedKeys.keys),
    ringPath: parsedKeys.ringPath
  };
};

const sortKeysByUserId = (keys: PrivateKey[] | PublicKey[]): any[] =>
  keys.sort((currentKey, nextKey) => {
    if (currentKey.userId < nextKey.userId) {
      return -1;
    }
    if (currentKey.userId > nextKey.userId) {
      return 1;
    }
    return 0;
  });

export const parsePrivateKeysResponse = (
  { status, keys }: KeysResponse,
  setErrorText: Function
): { keys: Array<PrivateKey>; ringPath: string } =>
  handleGetKeysResponse({ status, keys }, setErrorText);

export const parsePublicKeysResponse = (
  { status, keys }: KeysResponse,
  setErrorText: Function
): { keys: Array<PublicKey>; ringPath: string } =>
  handleGetKeysResponse({ status, keys }, setErrorText);
