import { Damage } from "./damage";
import { Dimentions } from "./types";

export class Weapon {
  private id: number; //
  private title: string; // не был задействован... или уже да ))
  private damage: Damage; // урон при объекту при, например, контакте с ним
  private fireRate: number; // интервал между выстрелами
  private maxAllowedStepRange: number; // интервал между шагами
  private stepRateFadeDown: boolean; // будет ли объект аттаки замедлятся, после выстрела

  private stepsLimit: number;
  private bulletDimentions: Dimentions;

  get_FireRate() {
    return this.fireRate;
  }

  get_bulletDimentions() {
    return { ...this.bulletDimentions };
  }

  get_damage() {
    return { ...this.damage };
  }

  get_maxAllowedStepRange() {
    return this.maxAllowedStepRange;
  }

  constructor({
    damage,
    fireRate,
    maxAllowedStepRange,
    stepRateFadeDown,
    stepsLimit,
    bulletDimentions,
  }: {
    damage: Damage;
    fireRate: number;
    maxAllowedStepRange: number;
    stepRateFadeDown: boolean;
    stepsLimit: number;
    bulletDimentions: Dimentions;
  }) {
    this.damage = damage;
    this.fireRate = fireRate;
    this.maxAllowedStepRange = maxAllowedStepRange;
    this.stepRateFadeDown = stepRateFadeDown;
    this.stepsLimit = stepsLimit;
    this.bulletDimentions = bulletDimentions;
  }
}
