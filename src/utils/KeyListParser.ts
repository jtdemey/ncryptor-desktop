import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";

export const parseKeyList = (
  keyListOutput: string,
): (PrivateKey | PublicKey)[] => {
  const keysToCreate: (PrivateKey | PublicKey)[] = [];
  const keyListRows = keyListOutput.split("\n");
  keyListRows.forEach((keyListRow) => {
    const delimitedInput = keyListRow.split(":");
    const recordType = delimitedInput[0];
    if (recordType === "pub" || recordType === "sub") {
      keysToCreate.push({
        color: "",
        createdDate: "",
        expirationDate: "",
        fingerprint: "",
        keyType: "",
        userId: "",
      });
    }
  });
  return parsedKeys;
};
