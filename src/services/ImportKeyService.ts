import fs from "fs";
import gpg from "gpg";
import temp from "temp";

export const importKey = async (publicKey: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const logError = (err: NodeJS.ErrnoException | null) =>
        err && console.error(`Import key err: ${err}`);
      temp.track();
      temp.open(
        {
          prefix: "ncryptor-",
          suffix: ".gpg"
        },
        (err: any, fileInfo: temp.OpenFile) => {
          if (err) logError(err);
          fs.write(
            fileInfo.fd,
            publicKey,
            (err: NodeJS.ErrnoException | null) => logError(err)
          );
          fs.close(fileInfo.fd, (err: NodeJS.ErrnoException | null) => {
            if (err) logError(err);
            gpg.call(
              "",
              ["--import", fileInfo.path],
              (error: any, response: Buffer) => {
                if (error) {
                  logError(error);
                  reject(error);
                }
                resolve(response.toString());
              }
            );
          });
        }
      );
    } catch (e: any) {
      console.error(e);
      reject(e);
    }
  });
};
