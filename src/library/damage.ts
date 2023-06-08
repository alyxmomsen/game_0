export type DamageClass = "phisical" | "magic";

export class Damage {
  class: DamageClass;
  value: number;

  actions({}) {}

  constructor(damageClass: DamageClass, value: number = 0) {
    this.class = damageClass;
    this.value = value;

    switch (damageClass) {
      case "magic":
        break;
      case "phisical":
        break;
    }
  }
}
