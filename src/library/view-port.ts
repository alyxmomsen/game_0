import { Position } from "./types";


export class ViewPort {

    position:Position ;
    positionMoveStepRange:{x:number , y:number} ;
    maxAllowMoveStepRange:number ;

    updatePosition () {
        this.position.x += this.positionMoveStepRange.x ;
        this.position.y += this.positionMoveStepRange.y ;
    }

    updatePositionMoveStepRangeByKeys (keys:string[]) {

        const moveLeft = keys.includes('j');
        const moveRight = keys.includes('l');
        const moveUp = keys.includes('i');
        const moveDown = keys.includes('k');

        const DELTA = 0.01 ;

        if(moveLeft && !moveRight) {

            if(-this.maxAllowMoveStepRange < (this.positionMoveStepRange.x - DELTA)) {
                
                this.positionMoveStepRange.x -= DELTA ;
            }


        } else if (!moveLeft && moveRight) {

            if(this.maxAllowMoveStepRange > (this.positionMoveStepRange.x + DELTA)) {
                
                this.positionMoveStepRange.x += DELTA ;
            }

        } else {
            
            if(this.positionMoveStepRange.x > 0) {
                if(this.positionMoveStepRange.x - DELTA <= 0 ) {
                    this.positionMoveStepRange.x = 0 ;
                } else {
                    this.positionMoveStepRange.x -= DELTA ;
                }
            } else if (this.positionMoveStepRange.x < 0) {
                if(this.positionMoveStepRange.x + DELTA >= 0 ) {
                    this.positionMoveStepRange.x = 0 ;
                } else {
                    this.positionMoveStepRange.x += DELTA ;
                }
            }
        }

        if(moveUp && !moveDown) {

            if(-this.maxAllowMoveStepRange < (this.positionMoveStepRange.y - DELTA)) {
                
                this.positionMoveStepRange.y -= DELTA ;
            }


        } else if (!moveUp && moveDown) {

            if(this.maxAllowMoveStepRange > (this.positionMoveStepRange.y + DELTA)) {
                
                this.positionMoveStepRange.y += DELTA ;
            }

        } else {
            
            if(this.positionMoveStepRange.y > 0) {
                if(this.positionMoveStepRange.y - DELTA <= 0 ) {
                    this.positionMoveStepRange.y = 0 ;
                } else {
                    this.positionMoveStepRange.y -= DELTA ;
                }
            } else if (this.positionMoveStepRange.y < 0) {
                if(this.positionMoveStepRange.y + DELTA >= 0 ) {
                    this.positionMoveStepRange.y = 0 ;
                } else {
                    this.positionMoveStepRange.y += DELTA ;
                }
            }
        }

    }

    autoFocuTo () {
        
    }

    constructor () {
        this.position = {x:0 , y:0} ;
        this.positionMoveStepRange = {x:0 , y:0} ;
        this.maxAllowMoveStepRange = 2 ;
    }
}