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

export const generateKeypair = async (
  userId: string,
  algorithm: string,
  expiration: string,
): Promise<string> =>
  await invokeTauriCommand("generate_keypair", {
    algorithm,
    expiration,
    userId,
  }).catch((error: any) => console.error(error));

