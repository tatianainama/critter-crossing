// Type definitions for [~Critter~]
// Project: [~critter-crossing~]
// Definitions by: [~tinama~]

export type Time = [number, number][];
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type FishLocationLabel = "River" | "River Clifftop" | "River Mouth" | "Pond" | "Sea" | "Pier";
export enum FishLocation {
  River,
  RiverClifftop,
  RiverMouth,
  Pond,
  Sea,
  Pier
}
enum ShadowSize {
  Tiny,
  Small,
  Medium,
  Large,
  VeryLarge,
  Huge,
  Long,
  Fin
}
type ShadowSizeLabel = "Tiny" | "Small" | "Medium" | "Large" | "Very Large" | "Huge" | "Long" | "Fin";
type InsectLocation = "Flying" | "Flying by Hybrid Flowers" | "Flying by Light" | "On Trees" | "On the Ground" | "On Flowers" | "On Flowers (White)" | "Shaking Trees" | "Underground" | "On Ponds and Rivers" | "On Tree Stumps" | "On the Ground (rolling snowballs)" | "On Trees (Coconut)" | "Under Trees Disguised as Leafs" | "On rotten food" | "Beach disguised as Shells" | "On Beach Rocks" | "On Trash Items" | "Villager's Heads" | "On Rocks (Rain)" | "Hitting Rocks";

export interface Critter {
  name: string,
  image: string,
  price: number,
  time: Time,
  months: Month[],
}

export interface Fish extends Critter {
  location: FishLocation,
  shadowSize: ShadowSize
}

export interface Insect extends Critter {
  flickPrice: number,
  location: InsectLocation
}

export default Critter;