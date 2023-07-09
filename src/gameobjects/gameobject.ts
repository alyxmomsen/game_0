import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import { Movement } from "../library/movement";
import { Bullet } from "./bullet";
import { SupplyBox } from "./supply-box";
import { Player } from "./player";
import { Enemy } from "./enemy";
import { Dimentions, GameObjectConstructor, GameObjectExtendsClasses, GameObjectKinds, Position } from "../library/types";

import { GameObject_Part_3 } from "./gameobject-part-3";
import { TickController } from "../library/main";
import { Controller } from "../library/controller";
import { GameObject_part_2 } from "./gameobject-part-2";
import { Weapon } from "../library/weapon";
import { Armor } from "../library/armore";

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

  abstract worldLimitCollision_handler () : void

  /* ===================================================== */


  isHPisSubZero () { // возвращает true если здох по здоровью
    return this.health <= 0 ? true : false ;
  }


  checkCollisionsForEveryOne (objects:GameObjectExtendsClasses[]) {// ecли есть хоть одна коллизия, то вернет true, иначе false

    let isCollision = false ;
    for (const object of objects) {
      
      if (object !== this && !this.isDied) { // если объект не является сам собой и если объект не "умер"
        
        if (this.checkNextPositionColissionWith(object.position , object.getDimentions())) { // проверка следующего шага на коллизию
          // object instanceof SupplyBox ; // не проходит эту проверку
          // в этом цикле можно что то сделать с конкретным объектом на котором произошла коллизия

          isCollision = this.ifCollisionIs_For(object); // абстрактный метод возвращает выполняет каки-то действия и подтверждает (или нет) коллизию
        }
      }
    }

    return isCollision ;
  }

  getAllDamages() {

    this.damaged.forEach(damage => {

      this.getDamage(damage.value);

    });

    this.damaged = [] ; // обнуляем массив урона
  }

  update({
    objects ,
    fieldDimentions ,
  }: {
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
  }): Bullet | null {

    
    this.getAllDamages(); // проходим по всем дамейджам и обнуляем список

    this.isDied = this.isHPisSubZero() ? true : this.isDied ; // 
    
    this.movement.updateStepRangeByController({...this.controller.move});

    this.updateNextPosition();

    let isCollision = this.checkCollisionsForEveryOne(objects);
    

    // проверяем не столкнулся ли с границей game field
    if (this.checkCollissionWithFieldLimits({xResolution:fieldDimentions.width , yResolution:fieldDimentions.height })) {

      isCollision = true;

      /* =================== otion =================== */

      this.worldLimitCollision_handler ()

      /* ============================================== */

    }

    if (isCollision) {
      
      this.totallyIfCollisionIs(null);
      // если на следующем шаге есть коллизия
      // снимаем проверки с других координат отличных от this.position
      // this.movement.currentStepRange = {x:0 , y:0} ;
      this.movement.targetPosition.x = this.position.x;
      this.movement.targetPosition.y = this.position.y;
      
    } else {
      
      this.updatePosition(); // обновляем позицию если нет коллизии на следующем шаге
    }


    /* fire fire fire */

    let isFire = false ;
    const controllerAttackDirection = this.controller.getAttackDirectionValue() ;
    let data:{
      pos: {
        x: number;
          y: number;
        };
        range: {
          x: number;
          y: number;
        };
    } ;

    if(controllerAttackDirection !== '' && this.attack.currentWeapon) {
      
      data = this.calculateSpawnPointEndAttackDirectionRangeBy(controllerAttackDirection);
      this.attack.setSpawnPoint(data.pos);
      this.attack.setDirection(data.range);

      isFire = true ;


      return  (!this.isDied && this.attack.ticker.tick() && isFire) ? new Bullet({
        health:100 ,
        id:0 ,
        ownDamage:this.attack.currentWeapon ? {...this.attack.currentWeapon.damage} : {damageClass:'magic' , value:100} ,
        position: this.attack.getSpawnPoint() ,
        dimentions:this.attack.currentWeapon ? {...this.attack.currentWeapon.bulletDimentions} : {width:10 , height:10} ,
        walkStepDirectionRange:{...this.attack.direction} , 
        walkStepRangeDelta:0.1 ,
        walkStepRangeDeltaMod:0.2 ,
        walkStepRateFadeDown:false ,
        walkStepsLimit:0 ,
      }) : null;


    }
    else {

      return null ;
    }



    
  }

  constructor({
    id,
    position,
    dimentions ,
    kind,
    maxAllowWalkStepRange ,
    walkStepDirectionRange: walkStepRange,
    walkStepsLimit,
    shouldFadeDownStepRate,
    ownDamage,
    health,
    weapons,
    color,
    armor,
    walkStepRangeDelta: stepRangeDelta , 
    walkStepRangeDeltaMod: stepRangeDeltaMod ,
  }: {
    id: number;
    kind: GameObjectKinds;
    maxAllowWalkStepRange:number ; // макс скорость
    walkStepDirectionRange: {x:number , y:number};
    walkStepsLimit: number;
    color: string;
    position: Position;
    dimentions:Dimentions ;
    ownDamage: Damage;
    health: number;
    weapons: Weapon[];
    armor: Armor;
    shouldFadeDownStepRate: boolean;
    walkStepRangeDelta:number ;
    walkStepRangeDeltaMod:number ;
  }) {
    super();

    this.movement = new Movement({
      maxWalkSteps: walkStepsLimit,
      shouldFadeDownStepRate,
      nextPosition: { ...position },
      stepRange: walkStepRange,
      maxAllowStepRange: maxAllowWalkStepRange ,
      stepRangeDelta ,
      stepRangeDeltaMod ,
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
  }
}
