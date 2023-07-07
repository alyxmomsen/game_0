import { Damage } from "../library/damage";
import { Dimentions, Position } from "../library/types";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { GameObject_part_1 } from "./gameobject-part-1";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

export class GameObject_part_2 extends GameObject_part_1 {
  displayStatsIntoTheBrowserConsole() {
    const str = `${this.attack.currentWeapon.damage.value} ${this.health} ${this.armor.health} `;

    console.log(str);
  }

  getDimentions() {
    return { ...this.dimentions };
  }

  getColor() {
    return this.color;
  }

  setAttackDirection(keys: string[]) {
    const up = keys.includes("ArrowUp");
    const down = keys.includes("ArrowDown");
    const left = keys.includes("ArrowLeft");
    const right = keys.includes("ArrowRight");

    // здесь есть баг, - если одновременно зажать две клавиши , то объект атакует сам себя

    if (up || down || left || right) {
      if (up && !down) {
        this.attack.direction.y = -1;
      } else if (!up && down) {
        this.attack.direction.y = 1;
      } else {
        this.attack.direction.y = 0;
      }

      if (left && !right) {
        this.attack.direction.x = -1;
      } else if (!left && right) {
        this.attack.direction.x = 1;
      } else {
        this.attack.direction.x = 0;
      }

      //временный дебаг, который иногда не срабатывает
      if (this.attack.direction.x === 0 && this.attack.direction.y === 0) {
        this.attack.direction.x = 1;
      }
    }
  }

  setWalkStepRate(value: number) {
    this.movement.setTickInterval(value < 1 ? 1 : value);
  }

  getDamage(damage: number) {
    if (this.armor.health > 0) {
      this.armor.health -= Math.floor((damage / 100) * this.armor.dempher);
      this.health -= Math.floor((damage / 100) * (100 - this.armor.dempher));
    } else {
      this.health -= damage;
    }
  }

  setOwnDamageValue(value: number) {}

  getOwnDamageValue() {}

  getHealth() {
    return this.health.toString();
  }

  geTheValueDamage() {}

  // 'атака' на указаный объект
  attackTo(
    object: Bullet | GameObject | Enemy | Player | SupplyBox,
    damage: Damage
  ) {
    object.pushIntoDamaged(new Damage(damage)); // добавляем объекту атаку в его очередь урона
  }

  pushIntoDamaged(damage: Damage) {
    this.damaged.push(damage);
  }

  // проверка на коллизию nextposition с переданными координатами
  checkNextPositionColissionWith(subjectPostion: Position , subjectDimentions:Dimentions) {
    if (
      this.movement.nextPosition.x < subjectPostion.x + subjectDimentions.width &&
      this.movement.nextPosition.x + this.dimentions.width > subjectPostion.x &&
      this.movement.nextPosition.y < subjectPostion.y + subjectDimentions.height &&
      this.movement.nextPosition.y + this.dimentions.height > subjectPostion.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  // проверка на коллизию со стенами
  checkCollissionWithFieldLimits({
    width,
    height,
  }: {
    width: number;
    height: number;
  }): boolean {
    if (
      this.movement.nextPosition.x >= width * 50 ||
      this.movement.nextPosition.x < 0 ||
      this.movement.nextPosition.y >= height * 50 ||
      this.movement.nextPosition.y < 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  calculateNextPosition({ x, y }: { x: 1 | -1 | 0; y: 1 | -1 | 0 }) {
    if (x !== 0 || y !== 0) {
      this.movement.nextPosition.y =
        this.position.y + (y * this.movement.stepRange);
      this.movement.nextPosition.x =
        this.position.x + (x * this.movement.stepRange);
    }

    if (x !== 0) {
      this.movement.direction = { x, y };
    } else if (y !== 0) {
      this.movement.direction = { x, y };
    }

    this.movement.counterOfSteps += 1; // счетчик сделаных шагов. связан. используется
  }

  updatePosition() {
    this.position.x = this.movement.nextPosition.x;
    this.position.y = this.movement.nextPosition.y;
  }

  /// beta beta beta
  calculateOwnDamageBySpeed() {
    const damage = this.attack.ownDamage.value;
    const stepRate = this.movement.getTickInterval();
    const calculatedDamageValue = Math.floor(
      damage / ((stepRate + 1000) / (1000 - stepRate))
    );

    return calculatedDamageValue;
  }
}
