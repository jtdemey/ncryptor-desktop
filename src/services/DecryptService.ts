import gpg from "gpg";

export const decryptString = async (
  recipient: string,
  text: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      gpg.decrypt(
        text,
        ["--default-key", recipient, "--armor", "--trust-model", "always"],
        (error: object, decrypted: Buffer) => {
          if (error) {
            console.error(error);
            reject(error);
          }
          resolve(decrypted.toString("ascii"));
        }
      );
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
