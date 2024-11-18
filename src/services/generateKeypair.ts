import { invokeTauriCommand } from "./invokeTauriCommand";

/*
1
key size
subkey size
expiry
confirmation y/N
userId
email
comment
Change Name Comment Email or Okay/Quit
Entropy time
DONE!
*/

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

