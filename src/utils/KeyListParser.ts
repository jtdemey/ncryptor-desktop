import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";
import { KeyTypes } from "../data/KeyTypes";
import { KeypairColors } from "../data/KeypairColors";

export const isSubkey = (key: PrivateKey | PublicKey): boolean =>
  key.keyType === KeyTypes.ssb || key.keyType === KeyTypes.sub;

const addKeyFromRow = (
  keys: (PrivateKey | PublicKey)[],
  row: string[],
  currentParentKey: PrivateKey | PublicKey,
): void => {
  const keyColor = KeypairColors[keys.length % KeypairColors.length].value;
  const isSub = row[0] === "ssb" || row[0] === "sub";
  keys.push({
    bitLength: parseInt(row[2]),
    capabilities: row[11],
    color: keyColor,
    createdDate: row[5],
    expirationDate: row[6],
    fingerprint: "",
    isDisabled: row[11].includes("d"),
    keyType: KeyTypes[row[0]],
    parentKeyFingerprint: isSub ? currentParentKey.fingerprint : undefined,
    publicKeyAlgorithm: row[3],
    userIds: isSub ? currentParentKey.userIds : [],
    validity: row[1],
  });
};

export const parseRow = (
  delimitedRow: string[],
  keysToCreate: (PrivateKey | PublicKey)[],
): void => {
  const recognizedKeyTypes = Object.keys(KeyTypes);
  const parentKeys = keysToCreate.filter(
    key => key.keyType === KeyTypes.pub || key.keyType === KeyTypes.sec,
  );
  const currentParentKey = parentKeys[parentKeys.length - 1];

  if (recognizedKeyTypes.includes(delimitedRow[0])) {
    addKeyFromRow(keysToCreate, delimitedRow, currentParentKey);
  }

  const currentKey = keysToCreate[keysToCreate.length - 1];
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
  keyListRows.forEach(keyListRow => {
    const delimitedRow = keyListRow.split(":");
    parseRow(delimitedRow, keysToCreate);
  });
  return keysToCreate;
};
