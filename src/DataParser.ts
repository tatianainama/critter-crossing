const month = [ '', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// enum LOCATION {
//   River,
//   RiverClifftop,
//   RiverMouth,
//   Pond,
//   Sea,
//   Pier
// };
export const FishLocationLabel = [
  'river',
  'clifftop river',
  'river mouth',
  'pond',
  'sea',
  'pier'
];

export const FishSizeLabel = [
  '',
  "Tiny",
  "Small",
  "Medium",
  "Large",
  "Very Large",
  "Huge",
  "Long",
  "Fin"
];

export const parseMonth = (num: number) => month[num];
export const parseFishLocation = (num: number) => FishLocationLabel[num];
export const parseFishSize = (num: number) => FishSizeLabel[num];

export default {
  parseMonth,
  parseFishLocation,
  parseFishSize,
};