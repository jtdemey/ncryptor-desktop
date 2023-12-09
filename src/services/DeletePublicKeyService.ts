import gpg from "gpg";

export const deletePublicKey = async (publicKey: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      gpg.call(
        "",
        ["--delete-keys", publicKey],
        (error: object, response: Buffer) => {
          if (error) {
            console.error(error);
            reject(error);
          }
          resolve(response.toString());
        }
      );
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
