export type AttackClass = "fisical" | "magic";

export class Attack {
  status: boolean;

  class: AttackClass;

  value: number;

  constructor(attackClass: AttackClass, value: number) {
    this.value = value;
    this.class = attackClass;
  }
}
