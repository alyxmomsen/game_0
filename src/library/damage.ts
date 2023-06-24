export type DamageClass = "phisical" | "magic";

export class Damage {
  damageClass: DamageClass;
  value: number;

  constructor ({damageClass , value}:{damageClass:DamageClass , value:number}) {
    this.damageClass = damageClass;
    this.value = value;
  }

  // constructor({class , value}/* damageClass: DamageClass, value: number = 0 */) {
    // this.class = damageClass;
    // this.value = value;
  // } 
}
