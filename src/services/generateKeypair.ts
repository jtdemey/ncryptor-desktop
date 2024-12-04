import { invokeTauriCommand } from "./invokeTauriCommand";

const constructUserId = (userId: string, email: string, comment: string): string => {
	let result = userId;
	if (comment) {
		result += ` (${comment})`;
	}
	if (email) {
		result += ` <${email}>`;
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

