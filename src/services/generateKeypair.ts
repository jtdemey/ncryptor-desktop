import { invokeTauriCommand } from "./invokeTauriCommand";

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
