export type ArmorClass = "heavy" | "light";

export class Armor {
  health: number;
  dempher: number;

  constructor({ health, dempher }: { health: number; dempher: number }) {
    this.health = health;
    this.dempher = dempher;
    // console.log("armore is plugged");
  }
}
