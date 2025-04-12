import { invokeTauriCommand } from "./invokeTauriCommand";

export const printPublicKey = async (user: string): Promise<string> => {
  const output: string = await invokeTauriCommand("print_public_key", {
    user,
  }).catch((error: any) => console.error(error));
  if (
    !output.startsWith("-----BEGIN PGP PUBLIC KEY BLOCK-----") ||
    output.indexOf("\n") === -1
  ) {
    return "Failed to print public key. Try running `gpg --export --armor [user]` in a terminal.";
  }
  return output;
};
