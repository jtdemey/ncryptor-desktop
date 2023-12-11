import { invokeTauriCommand } from "./invokeTauriCommand";

export const getGpgVersion = async (): Promise<any> => {
  return await invokeTauriCommand("get_gpg_version", {
    nameParam: "Tortimer Greene",
  }).catch((error: any) => console.error(error));
};
