import gpg from "gpg";

const SigningOnlyCurves = ["cv25519"];

export const getCurves = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      gpg.call(
        "",
        ["--with-colons", "--list-config", "curve"],
        (error: object, curves: string) => {
          if (error) {
            console.error(error);
            reject(error);
          }
          resolve(curves.toString());
        }
      );
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
