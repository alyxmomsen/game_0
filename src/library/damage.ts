import { DamageClass } from "./types";

export class Damage {
  damageClass: DamageClass;
  value: number;

  constructor({
    damageClass,
    value,
  }: {
    damageClass: DamageClass;
    value: number;
  }) {
    this.damageClass = damageClass;
    this.value = value;
  }
}
