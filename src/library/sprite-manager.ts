import { TickController } from "./main";

export class SpriteManager {

    tickController:TickController ;

    currentFrame:number ;

    framesAmount:number ;
    sprite:{
        frame:{x:number , y:number} , 
        src:HTMLImageElement ,
    } ;

    getFrame () {

        if(this.currentFrame > 3) {
            this.currentFrame = 0 ;
        }

        if(this.tickController.tick()) {
            this.currentFrame++ ;
        }

        return {x:(this.currentFrame * 32) , y:0} ;
    }

    constructor (src:HTMLImageElement , framesAmount:number) {

        this.sprite = {
            frame:{x:0 , y:0} ,
            src ,
        } ;

        this.currentFrame = 0 ;

        this.framesAmount = framesAmount ;

        this.tickController = new TickController(1000 / 5);
    }

}