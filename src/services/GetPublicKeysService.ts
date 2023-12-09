import gpg from "gpg";

export const getPublicKeys = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      gpg.call("", ["-k"], (error: object, publicKeys: string) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        resolve(publicKeys.toString());
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
