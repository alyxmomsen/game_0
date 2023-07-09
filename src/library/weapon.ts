import { Damage } from "./damage";
import { Dimentions } from "./types";

export class Weapon {
  id: number; //
  title: string; // не был задействован... или уже да ))
  damage: Damage; // урон при объекту при, например, контакте с ним
  fireRate: number; // интервал между выстрелами
  stepRate: number; // интервал между шагами
  stepRateFadeDown: boolean; // будет ли объект аттаки замедлятся, после выстрела
  stepsLimit: number;
  bulletDimentions:Dimentions ;

  constructor({
    damage,
    fireRate,
    stepRate,
    stepRateFadeDown,
    stepsLimit,
    bulletDimentions ,
  }: {
    damage: Damage;
    fireRate: number;
    stepRate: number;
    stepRateFadeDown: boolean;
    stepsLimit: number;
    bulletDimentions:Dimentions ;
  }) {
    this.damage = damage;
    this.fireRate = fireRate;
    this.stepRate = stepRate;
    this.stepRateFadeDown = stepRateFadeDown;
    this.stepsLimit = stepsLimit;
    this.bulletDimentions = bulletDimentions ;
  }
}
