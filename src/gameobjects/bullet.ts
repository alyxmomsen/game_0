import { Damage } from "../library/damage";
import GameObject, { Position } from "./gameobject";

export class Bullet extends GameObject {

    constructor ({position }:{position:Position }) {
        super({ damage:new Damage('phisical' , 100) , armorKind:'heavy' , backgroundColor:'white' ,color:'white' , damaged:[] , id:0 , kind:'damage-entity' , position ,walkSpeed:100});

    }
}