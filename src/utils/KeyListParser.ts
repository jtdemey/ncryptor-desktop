import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";

const keysToCreate: (PrivateKey | PublicKey)[] = [];

export const parseKeyListRow = (keyListRow: string): void => {
  const delimitedInput = keyListRow.split(":");
  const recordType = delimitedInput[0];
  keysToCreate.push({
    color: "",
    createdDate: "",
    expirationDate: "",
    fingerprint: "",
    keyType: "",
    userId: "",
  });
};

export const parseKeyList = (
  keyListOutput: string,
): (PrivateKey | PublicKey)[] => {
  const outputRows = keyListOutput.split("\n");
  const parsedKeys = outputRows.map((keyListRow) =>
    parseKeyListRow(keyListRow),
  );
  return parsedKeys;
};
