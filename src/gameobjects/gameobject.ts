import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import { Movement } from "../library/movement";
import { Bullet } from "./bullet";
import { SupplyBox } from "./supply-box";
import { Player } from "./player";
import { Enemy } from "./enemy";
import { Dimentions, GameObjectConstructor } from "../library/types";

import { GameObject_Part_3 } from "./gameobject-part-3";
import { TickController } from "../library/main";
import { Controller } from "../library/controller";
import { GameObject_part_2 } from "./gameobject-part-2";

export default abstract class GameObject extends GameObject_part_2 {
  /* ====================== options ====================== */

  abstract ifCollisionIs_For(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): boolean;

  abstract totallyIfCollisionIsNot(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): void;

  abstract totallyIfCollisionIs(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): void;

  /* ===================================================== */

  update({
    objects ,
    fieldDimentions ,
  }: {
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
  }): Bullet | false {

    
    this.movement.updateStepRangeByController({...this.controller.move});

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

    if (isCollision) {
      
      this.totallyIfCollisionIs(null);
      // если на следующем шаге есть коллизия
      // снимаем проверки с других координат отличных от this.position
      this.movement.stepRange = {x:0 , y:0} ;
      this.movement.nextPosition.x = this.position.x;
      this.movement.nextPosition.y = this.position.y;
      
    } else {
      
      this.updatePosition(); // обновляем позицию если нет коллизии на следующем шаге
    }

    return  false;
  }

  constructor({
    id,
    position,
    dimentions ,
    kind,
    maxWalkStepRange ,
    walkStepDirectionRange: walkStepRange,
    walkStepsLimit,
    shouldFadeDownStepRate,
    ownDamage,
    direction,
    health,
    weapons,
    color,
    armor,
  }: GameObjectConstructor) {
    super();
    this.movement = new Movement({
      direction,
      maxWalkSteps: walkStepsLimit,
      shouldFadeDownStepRate,
      nextPosition: { ...position },
      stepRange: walkStepRange,
      maxStepRange: maxWalkStepRange ,
    });

    this.dimentions = { ...dimentions };

    this.position = { ...position };
    this.attack = new Attack({ownDamage, weapons , spawnPoint:{...this.position}});
    this.armor = armor;
    this.damaged = [];
    this.isDied = false;
    this.kind = kind;
    this.id = id;
    this.health = health;
    this.maxHealth = health ;
    this.color = color;

    this.dateOfCreated = Date.now();

    this.rendering = {
      animateTicker: new TickController(200),
      currentSpriteState: 0,
    };

    this.controller = new Controller ;

    // console.log(this.attack.ticker);
  }
}
