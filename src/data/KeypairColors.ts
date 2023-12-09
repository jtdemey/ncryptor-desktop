type KeypairColor = {
  colorName: string;
  value: string;
};

const genColor = (colorName: string, value: string): KeypairColor => ({
  colorName,
  value
});

export const KeypairColors = [
  genColor("NAVY", "hsl(202, 77%, 7%)"),
  genColor("RICH_BLUE_GREEN", "hsl(175, 41%, 16%)"),
  genColor("RIFLE_GREEN", "hsl(114, 15%, 28%)"),
  genColor("DARK_PURPLE", "hsl(330, 29%, 20%)"),
  genColor("AMARANTH", "hsl(324, 56%, 30%)"),
  genColor("BLUE_YONDER", "hsl(219, 26%, 52%)"),
  genColor("AUBURN", "hsl(357, 63%, 33%)"),
  genColor("MAHOGANY", "hsl(22, 75%, 35%)"),
  genColor("LEMON_CURRY", "hsl(47, 100%, 26%)"),
  genColor("FOREST_GREEN", "hsl(112, 56%, 16%)"),
  genColor("ROSEWOOD", "hsl(2, 84%, 20%)"),
  genColor("SONIC_SILVER", "hsl(11, 5%, 28%)")
];
