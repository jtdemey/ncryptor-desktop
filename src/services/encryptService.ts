import gpg from "gpg";

export const encryptString = async (
  sender: string,
  recipient: string,
  text: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      gpg.encrypt(
        text,
        [
          "--default-key",
          sender,
          "--recipient",
          recipient,
          "--armor",
          "--trust-model",
          "always"
        ],
        (error: object, encrypted: Buffer) => {
          if (error) {
            console.error(error);
            reject(error);
          }
          resolve(encrypted.toString("ascii"));
        }
      );
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
