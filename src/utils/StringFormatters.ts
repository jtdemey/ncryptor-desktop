import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";

export const applyEllipsis = (text: string, length: number): string =>
  text?.length > length ? `${text.substring(0, length)}...` : text;

export const displayKeyName = (key: PrivateKey | PublicKey, userIdIndex = 0) =>
  key.userIds[userIdIndex]?.name ?? "(no user ID)";