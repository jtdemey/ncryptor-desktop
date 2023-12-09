import gpg from "gpg";

export const deletePrivateKey = async (privateKey: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      gpg.call(
        "",
        ["--delete-secret-keys", privateKey],
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
