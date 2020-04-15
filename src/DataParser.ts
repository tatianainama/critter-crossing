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

export const parseMonth = (num: number) => month[num];
export const parseFishLocation = (num: number) => FishLocationLabel[num];

export default {
  parseMonth,
  parseFishLocation
};