

export function randomNumberFromTo ({from , to}:{from:number , to:number , }) {

    

    return Math.floor(Math.random() * to - from) + from ;

}