import { Damage } from "./damage";

export class Weapon {
  id: number; //
  title: string; // не был задействован... или уже да ))
  damage: Damage; // урон при объекту при, например, контакте с ним
  fireRate: number; // интервал между выстрелами
  stepRate: number; // интервал между шагами
  stepRateFadeDown: boolean; // будет ли объект аттаки замедлятся, после выстрела

  constructor({
    damage,
    fireRate,
    stepRate,
    stepRateFadeDown,
  }: {
    damage: Damage;
    fireRate: number;
    stepRate: number;
    stepRateFadeDown: boolean;
  }) {
    this.damage = damage;
    this.fireRate = fireRate;
    this.stepRate = stepRate;
    this.stepRateFadeDown = stepRateFadeDown;
  }
}
