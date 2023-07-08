import { TickController } from "./main";
import { Direction_stringType } from "./types";


export class Controller {

    ticker:TickController ;

    // attack:{
    //     up:boolean ;
    //     down:boolean ;
    //     left:boolean ;
    //     right:boolean ;
    // }

    move:{
        up:boolean ;
        down:boolean ;
        left:boolean ;
        right:boolean ;
    }



    private attack:Direction_stringType|'' ;

    

    fire:boolean ;


    updateByKeys (keys:string[]) {

        const w = keys.includes("w");
        const s = keys.includes("s");
        const a = keys.includes("a");
        const d = keys.includes("d");

        const arrowUp = keys.includes("ArrowUp");
        const arrowRight = keys.includes("ArrowRight");
        const arrowDown = keys.includes("ArrowDown");
        const arrowLeft = keys.includes("ArrowLeft");


        this.move.up = w 
        this.move.right = d ;
        this.move.down = s ;
        this.move.left = a ;


        if(arrowDown) {
            this.attack = 'down' ;
        } else if (arrowRight) {
            this.attack = 'right' ;

        } else if (arrowLeft) {
            this.attack = 'left' ;
        } else if (arrowUp) {
            this.attack = 'up' ;
        } else {
            this.attack = '' ;
        }

    }

    autoUpdatePer (seconds:number) {

        
        if(this.ticker.tick()) {
            
            this.ticker.setTickInterval(Math.floor(Math.random() * 1000));
            // this.ticker.setTickInterval(Math.fl) ;

            this.move.up = !!Math.floor(Math.random() * 2);
            this.move.right = !!Math.floor(Math.random() * 2);
            this.move.down = !!Math.floor(Math.random() * 2);
            this.move.left = !!Math.floor(Math.random() * 2);


            const arr:["up" , "right" , "down" , "left"] = ["up" , "right" , "down" , "left"] ;

            this.attack = arr[Math.floor(Math.random() * 4)] ;


        }

    }

    getAttackDirectionValue () {

        return this.attack ;

    }


    constructor () {

        this.move = {
            up:false , 
            right : false ,
            down : false ,
            left : false ,
        } ;

        // this.attack = {
        //     up:false , 
        //     right : false ,
        //     down : false ,
        //     left : false ,
        // }

        this.attack = '' ;

        this.fire = false ;

        this.ticker = new TickController(1000);
    }
}