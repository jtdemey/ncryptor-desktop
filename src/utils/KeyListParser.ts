import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";

const keysToCreate: (PrivateKey | PublicKey)[] = [];

export const parseKeyList = (
  keyListOutput: string,
): (PrivateKey | PublicKey)[] => {
  const outputRows = keyListOutput.split("\n");
  outputRows.forEach((outputRow) => {
    const delimitedInput = keyListRow.split(":");
    const recordType = delimitedInput[0];

    if (recordType === "pub" || recordType || "sub") {
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
