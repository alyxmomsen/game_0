export type ArmorClass = "heavy" | "light";

// стата по броне
export class Armor {
  health: number;
  dempher: number;

  constructor({ health, dempher }: { health: number; dempher: number }) {
    this.health = health;
    this.dempher = dempher;
    // console.log("armore is plugged");
  }
}
