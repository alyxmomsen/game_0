import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { generateMovementDirection } from "../library/main";
import { Dimentions, GameObjectExtendsClasses, Position } from "../library/types";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import GameObject from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

// частный случай GameObject
export class Enemy extends GameObject {
  ifCollisionIs_For(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): boolean {
    return true;
  }

  totallyIfCollisionIsNot(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  totallyIfCollisionIs(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  update({
    objects,
    fieldDimentions,
  }: {
    objects: GameObjectExtendsClasses[];
    fieldDimentions: Dimentions;
  }): null | Bullet {


    this.controller.autoUpdatePer(1000);
    
    super.update({
      objects,
      fieldDimentions,
    });

    let isFire = false ;
    const controllerAttackDirection = this.controller.getAttackDirectionValue() ;
    const directionRange = {x:0 , y:0} ;

    if(controllerAttackDirection !== '') {
      

      switch (controllerAttackDirection) {
        case 'down':
          this.attack.setSpawnPoint({x:this.position.x  , y:this.position.y + this.getDimentions().height });
          directionRange.y = 30 ;
        break ;
        case 'left' :
          this.attack.setSpawnPoint({x:this.position.x - this.getDimentions().width  , y:this.position.y});
          directionRange.x = -30 ;
        break ;
        case 'right': 
          this.attack.setSpawnPoint({x:this.position.x + this.getDimentions().width  , y:this.position.y});
          directionRange.x = 30 ;
        break ;
        case 'up' :
          this.attack.setSpawnPoint({x:this.position.x  , y:this.position.y + this.getDimentions().height });
          directionRange.y = -30 ;
        break ;
      }


      isFire = true ;
    }

    return (!this.isDied && this.attack.ticker.tick() && isFire) ? new Bullet({
      direction:{x:1 , y:0} ,
      health:100 ,
      id:0 ,
      ownDamage:{damageClass:'magic' , value:1000} ,
      position: this.attack.getSpawnPoint() ,
      walkStepDirectionRange:directionRange , 
      walkStepRateFadeDown:false ,
      walkStepsLimit:0 ,
    }) : null 
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
      color: "#2e3628",
      id,
      kind: "enemy",
      maxWalkStepRange:1 ,
      walkStepDirectionRange: {x:0 , y:0},
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      position,
      dimentions: {width:100 , height:50} ,
      ownDamage: new Damage({ damageClass: "phisical", value: 10 }),
      weapons,
      direction: { x: 1, y: 0 },
      health: Math.floor(Math.random() * 995) + 5 /* 1000 */,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000) /* 1000 */,
        dempher: Math.floor(Math.random() * 99) + 1 /* 90 */,
      }),
    });
  }
}
