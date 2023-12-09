export const shiftLightness = (hslColor: string, amount: number): string => {
  const splitColor: string[] = hslColor.split(",");
  const lightness: number = parseInt(splitColor[2].trim().replace("%)", ""));
  const newLightness: number = lightness + amount;
  splitColor[2] = ` ${newLightness}%)`;
  return splitColor.join("");
};
