import gpg from "gpg";

export const genKey = async (
  userId: string,
  algorithm: string,
  expirationDate: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      gpg.call(
        "",
        ["--quick-gen-key", userId, algorithm, "encr", expirationDate],
        (error: object, privateKey: string) => {
          if (error) {
            console.error(error);
            reject(error);
          }
          resolve(privateKey.toString());
        }
      );
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
