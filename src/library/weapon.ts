import { Damage } from "./damage";
import { Dimensions } from "./types";

export class Weapon {
  private id: number; //
  private title: string; // не был задействован... или уже да ))
  private damage: Damage; // урон при объекту при, например, контакте с ним
  private fireRate: number; // интервал между выстрелами
  private maxAllowedStepRange: number; // интервал между шагами
  private stepRateFadeDown: boolean; // будет ли объект аттаки замедлятся, после выстрела
  private impulse: number;
  private stepsLimit: number;
  private bulletDimentions: Dimensions;
  private bullet: {
    dimensions: Dimensions;
    weight: number;
  };

  get_FireRate() {
    return this.fireRate;
  }
  get_title() {
    return this.title;
  }
  get_bulletDimentions() {
    return { ...this.bullet.dimensions };
  }

  get_weight() {
    return this.bullet.weight;
  }

  get_damage() {
    return { ...this.damage };
  }
  get_maxAllowedStepRange() {
    return this.maxAllowedStepRange;
  }
  get_impulse() {
    return this.impulse;
  }

  getProps() {
    return {
      id: this.id,
      title: this.title,
      damage: this.damage,
      fireRate: this.fireRate,
      maxAllowedStepRange: this.maxAllowedStepRange,
    };
  }

  constructor({
    damage,
    fireRate,
    maxAllowedStepRange,
    stepRateFadeDown,
    stepsLimit,
    bullet,
    title,
    impulse,
  }: {
    damage: Damage;
    fireRate: number;
    maxAllowedStepRange: number;
    stepRateFadeDown: boolean;
    stepsLimit: number;
    bullet: {
      weight: number;
      dimensions: Dimensions;
    };
    title: string;
    impulse: number;
  }) {
    this.damage = damage;
    this.fireRate = fireRate;
    this.maxAllowedStepRange = maxAllowedStepRange;
    this.stepRateFadeDown = stepRateFadeDown;
    this.stepsLimit = stepsLimit;
    this.bullet = bullet;
    this.title = title;
    this.impulse = impulse;
  }
}
