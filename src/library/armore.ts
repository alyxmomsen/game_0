// стата по броне
export class Armor {
  private health: number;
  private maxHealth: number;
  dempher: number;

  getHealthValue() {
    return this.health;
  }

  getMaxHaxHealtValue() {
    return this.maxHealth;
  }

  decreaseArmorHealth(value: number) {
    this.health -= value;
  }

  increaseArmorHealth(value: number) {}

  constructor({ health, dempher }: { health: number; dempher: number }) {
    this.health = health;
    this.dempher = dempher;
    this.maxHealth = health;
    // console.log("armore is plugged");
  }
}
