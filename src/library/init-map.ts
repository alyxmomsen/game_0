import { Dimensions, Position } from "./types";


type CellTypes = 'void'|'obst'|'path'|'door'|'reserve';



class Cell {

    private static IDCounter:number = 0;
    private static readonly DIMENSIONS:Dimensions = {width:100 , height:100};

    private ID:number ;
    private next:Cell|null ;
    private prev:Cell|null ;
    private position:Position ;

    static getDimesions () {
        return {...Cell.DIMENSIONS} ;
    }

    getPos () {
        return {...this.position} ;
    }

    setNext(cell:Cell) {
        this.next = cell ;
        this.next.setPrev(this);
    }

    setPrev (cell:Cell) {
        this.prev = cell ;
    }

    getNext() {
        return this.next ;
    }

    getPrev () {
        
    }

    private setID () {

        this.ID = Cell.IDCounter++ ;
        
    }

    constructor ({pos}:{pos:Position}) {
        this.position = pos ;
        this.next = null ;
        this.prev = null ;
        this.setID();
    }
}

export default class MapManager {

    private initIterator:Cell ;
    private cellIterator:Cell ;
    private static readonly DIRECTIONS:['up','right','down','left'] = ['up','right','down','left'] ;

    setCell () {


        const direction = MapManager.DIRECTIONS[Math.floor(Math.random() * MapManager.DIRECTIONS.length)] ;
        const cellsDimestions = Cell.getDimesions() ;
        const curPos = this.cellIterator.getPos();

        const newPos:Position = {x:curPos.x + (direction === 'right' ? 100 : direction === 'left' ? -100 : 0) , y:curPos.y + (direction === 'down' ? 100 : direction === 'up' ? -100 : 0) }

        const testCell = new Cell({pos:newPos}) ;

        const recursiveCheck = (point:Cell , testCell:Cell) => {

            

            if(testCell.getPos().x + cellsDimestions.width >= point.getPos().x && testCell.getPos().x > point.getPos().x + cellsDimestions.width) {

            }

        }


        recursiveCheck (this.cellIterator , testCell) ;

        this.cellIterator.setNext(testCell);
        const next = this.cellIterator.getNext();
        if(next) {

            this.cellIterator = next;
            
        }
        console.log(this.cellIterator);
    }

    constructor () {
        this.initIterator = new Cell ({pos:{x:0 , y:0}}); // start position
        this.cellIterator = this.initIterator ; 
    }
}

const mm = new MapManager () ;
mm.setCell();
mm.setCell();



console.log('file' , mm);