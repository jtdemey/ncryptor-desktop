import gpg from "gpg";

export const getPrivateKeys = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      gpg.call("", ["-K"], (error: object, privateKeys: string) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        resolve(privateKeys.toString());
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
