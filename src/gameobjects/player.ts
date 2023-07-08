import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { Dimentions, GameObjectKinds, Position } from "../library/types";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { SupplyBox } from "./supply-box";

export class Player extends GameObject {
  ifCollisionIs_For(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): boolean {
    if (object instanceof SupplyBox) {
      object.isDied = true;
      this.increaseHealth(500);
      return false;
    } else {
      return true;
    }
  }

  totallyIfCollisionIsNot(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  totallyIfCollisionIs(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  calculateNextPosition_beta() {
    
  }

  

  keysHandler (keys:string[]) {

    const up = keys.includes("ArrowUp");
    const down = keys.includes("ArrowDown");
    const left = keys.includes("ArrowLeft");
    const right = keys.includes("ArrowRight");

  }

  checkCollisionsTo(object:'') {

  }

  update({
    keys,
    objects,
    fieldDimentions,
  }: {
    keys: string[];
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
  }): false | Bullet {

    const w = keys.includes("w");
    const s = keys.includes("s");
    const a = keys.includes("a");
    const d = keys.includes("d");

    this.movement.updateStepRangeBy(w , s , a , d);

    this.updateNextPosition();


    /* =========================================== */
    let isCollision = false;

    for (const object of objects) {
      // если объект не является сам собой и если объект не "умер"
      if (object !== this && !this.isDied) {
        
        // проверка следующего шага на коллизию
        if (this.checkNextPositionColissionWith(object.position , object.getDimentions())) {
          // object instanceof SupplyBox ; // не проходит эту проверку
          // в этом цикле можно что то сделать с конкретным объектом на котором произошла коллизия

          isCollision = this.ifCollisionIs_For(object); // абстрактный метод возвращает выполняет каки-то действия и подтверждает (или нет) коллизию
        }
      }
    }
    /* =========================================== */

    // проверяем не столкнулся ли с границей game field
    if (this.checkCollissionWithFieldLimits({xResolution:fieldDimentions.width , yResolution:fieldDimentions.height })) {
      isCollision = true;
      if (this.kind === "damage-entity") {
        // костыль
        this.isDied = true;
      }
    }

    if (!isCollision) {
      this.updatePosition(); // обновляем позицию если нет коллизии на следующем шаге
      this.totallyIfCollisionIsNot(null);
    } else {
      this.totallyIfCollisionIs(null);
      // если на следующем шаге есть коллизия
      // снимаем проверки с других координат отличных от this.position
      this.movement.stepRange = {x:0 , y:0} ;
      this.movement.nextPosition.x = this.position.x;
      this.movement.nextPosition.y = this.position.y;
    }



    super.update({
      objects,
      fieldDimentions,
    });

    return false ;

  }

  constructor({
    id,
    position,
    weapons,
  }: {
    id: number;
    position: Position;
    weapons: Weapon[];
  }) {
    super({
      id,
      kind: "player",
      maxWalkStepRange:4,
      walkStepDirectionRange: {x:0 , y:0},
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      color: "green",
      position,
      dimentions: {width:100 , height:100} ,
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons,
      direction: { x: 0, y: 0 },
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher:99 /* Math.floor(Math.random() * 99) + 1 */,
      }),
    });
  }
}
