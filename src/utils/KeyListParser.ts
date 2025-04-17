import type {
  PrivateKey,
  PublicKey,
  UserId,
} from "../components/Main/NcryptorApp";
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

/**
 * Get a UserId from a raw uid row
 * @param {string} rawUserId - Output row from "gpg -k/-K --with-colons" prefixed "uid"
 * @returns {UserId} User ID object
 */
export const parseUserId = (rawUserId: string): UserId => {
  let name = rawUserId;
  let email: string | undefined = undefined;
  let comment: string | undefined = undefined;
  if (rawUserId.includes("<")) {
    const start = rawUserId.indexOf("<");
    const end = rawUserId.indexOf(">");
    email = rawUserId.substring(start + 1, end);
    name = name.substring(0, start) + name.substring(end + 1, name.length);
  }
  if (rawUserId.includes("(")) {
    const start = rawUserId.indexOf("(");
    const end = rawUserId.indexOf(")");
    comment = rawUserId.substring(start + 1, end);
    name = name.substring(0, start) + name.substring(end + 1, name.length);
  }
  return {
    name: name.trim(),
    email,
    comment,
  };
};

export const parseRow = (
  delimitedRow: string[],
  keysToCreate: (PrivateKey | PublicKey)[],
): void => {
  const parentKeys = keysToCreate.filter(
    key => key.keyType === KeyTypes.pub || key.keyType === KeyTypes.sec,
  );
  const currentParentKey = parentKeys[parentKeys.length - 1];

  const recognizedKeyTypes = Object.keys(KeyTypes);
  if (recognizedKeyTypes.includes(delimitedRow[0])) {
    addKeyFromRow(keysToCreate, delimitedRow, currentParentKey);
  }

  const currentKey = keysToCreate[keysToCreate.length - 1];
  if (delimitedRow[0] === "fpr") {
    currentKey.fingerprint = delimitedRow[9];
  }

  if (delimitedRow[0] === "uid") {
    currentKey.userIds.push(parseUserId(delimitedRow[9]));
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
