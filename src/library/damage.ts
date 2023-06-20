export type DamageClass = "phisical" | "magic";

export class Damage {
  class: DamageClass;
  value: number;

  constructor(damageClass: DamageClass, value: number = 0) {
    this.class = damageClass;
    this.value = value;
  }
}
