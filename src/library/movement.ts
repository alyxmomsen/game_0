import { Direction } from "../gameobjects/gameobject";
import { Tick } from "./main";


export class Movement {

    tickInterval:number ;
    direction:Direction ;
    ticker:Tick ;

    constructor (tickInterval:number , direction:Direction) {
        this.ticker = new Tick(tickInterval) ;
        this.direction = direction ;
    }
}