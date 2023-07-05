// стата по броне
export class Armor {
  health: number;
  dempher: number;

  decreaseArmorHealth(value: number) {
    // this.health ;
  }

  increaseArmorHealth(value: number) {}

  constructor({ health, dempher }: { health: number; dempher: number }) {
    this.health = health;
    this.dempher = dempher;
    // console.log("armore is plugged");
  }
}
