import { invokeTauriCommand } from "./invokeTauriCommand";

const constructUserId = (
  userId: string,
  email: string,
  comment: string,
): string => {
  let result = userId;
  if (email) {
    result += ` <${email}>`;
  }
  if (comment) {
    result += ` (${comment})`;
  }
  return result;
};

export const generateKeypair = async (
  userId: string,
  email: string,
  comment: string,
  algorithm: string,
  expiration: string,
): Promise<string> =>
  await invokeTauriCommand("generate_keypair", {
    algorithm,
    expiration,
    userId: constructUserId(userId, email, comment),
  }).catch((error: any) => console.error(error));
