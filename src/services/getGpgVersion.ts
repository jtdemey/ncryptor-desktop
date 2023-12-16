import { invokeTauriCommand } from "./invokeTauriCommand";

export const getGpgVersion = async (): Promise<any> => {
  const output: string = await invokeTauriCommand("get_gpg_version").catch(
    (error: any) => console.error(error),
  );
  if (!output.startsWith("gpg") || output.indexOf("\n") === -1) {
    return "Unknown gpg version";
  }
  const version: string = output.split("\n")[0].split(" ")[2];
  return `Using gpg v${version}`;
};
