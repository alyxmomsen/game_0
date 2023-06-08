
export class Tick {

    currentTick ;

    tick () {

        const now = Date.now();

        if((now - this.currentTick) > 1000 ) {
            this.currentTick = now ;
            return true ;
        }
        else {
            return false ;
        }
    }

    constructor () {
        this.currentTick = Date.now() ;
    }
}