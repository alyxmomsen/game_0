import GameObject from "../gameobjects/gameobject";
import { Tick } from "../library/main";

const ticker = new Tick ;

export default class Game {

    gameObjects = [] ;

    createGameObject() {

        let doLoopAgain = false ;
        let newID = undefined ;

        let counter = 0 ;
        do {

            console.log('iter' , ++counter);

            newID = Math.floor(Math.random() * 3) ;

            for (let i = 0 ; i < this.gameObjects.length ; i++) {

                if(this.gameObjects[i].id === newID) {

                    doLoopAgain = true ;
                    break ;
                }

                doLoopAgain = false ;
            }


        }while (doLoopAgain) ;

        return new GameObject(newID);
    }

    update () {

        if(ticker.tick()) {


            console.log('tick');
        }
        
    }

    render () {

        this.gameObjects.forEach(elem => {
            elem.render();
        });

    }


    constructor () {

        this.gameObjects.push(this.createGameObject());
        this.gameObjects.push(this.createGameObject());
        this.gameObjects.push(this.createGameObject());
        
    }
}