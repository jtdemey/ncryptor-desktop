import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";
import { KeyTypes } from "../data/KeyTypes";
import { KeypairColors } from "../data/KeypairColors";

export const parseRow = (
  delimitedRow: string[],
  keysToCreate: (PrivateKey | PublicKey)[],
): void => {
  const recognizedKeyTypes = Object.keys(KeyTypes);
  const currentKey = keysToCreate[keysToCreate.length - 1];
  if (recognizedKeyTypes.includes(delimitedRow[0])) {
    const keyColor =
      KeypairColors[keysToCreate.length % KeypairColors.length].value;
    keysToCreate.push({
      bitLength: parseInt(delimitedRow[2]),
      color: keyColor,
      createdDate: delimitedRow[5],
      expirationDate: delimitedRow[6],
      fingerprint: "",
      keyCapabilities: delimitedRow[11],
      keyType: KeyTypes[delimitedRow[0]],
      publicKeyAlgorithm: delimitedRow[3],
      userIds: [],
      validity: delimitedRow[1],
    });
  }
  if (delimitedRow[0] === "fpr") {
    currentKey.fingerprint = delimitedRow[9];
  }
  if (delimitedRow[0] === "uid") {
    if (delimitedRow[9].indexOf("<") === -1) return;
    currentKey.userIds.push({
      email: delimitedRow[9].replace(">", "").split("<")[1],
      name: delimitedRow[9].split("<")[0],
    });
  }
};

export const parseKeyList = (
  keyListOutput: string,
): (PrivateKey | PublicKey)[] => {
  const keysToCreate: (PrivateKey | PublicKey)[] = [];
  const keyListRows = keyListOutput.split("\n");
  keyListRows.forEach((keyListRow) => {
    const delimitedRow = keyListRow.split(":");
    parseRow(delimitedRow, keysToCreate);
  });
  return keysToCreate;
};
