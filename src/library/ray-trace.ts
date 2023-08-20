import { Dimensions, GameObjectExtendsClasses, Position } from "./types";

export default class RayTracing {

    subject: {
        position:Position ;
        dimensions:Dimensions ;
    }

    updatePosition () {
        
    }

    constructor (gameObject: {position:Position , dimensions:Dimensions}) {

        this.subject = {...gameObject} ;
    }
}