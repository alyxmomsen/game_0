import Door from "../gameobjects/door";
import { Dimensions, Position } from "./types";

type CellTypes = "void" | "obst" | "path" | "door" | "reserve";

let i = 0;

const recursiveCheck = (point: Cell, testCell: Cell): boolean => {
  console.log(++i);

  if (
    testCell.getPos().x === point.getPos().x &&
    testCell.getPos().y === point.getPos().y
  ) {
    console.log("alaaaaarm ! it is the collisioooooooooon");
    return true;
  } else {
    const prevPoint = point.getPrev();

    if (prevPoint) {
      return recursiveCheck(prevPoint, testCell);
    } else {
      return false;
    }
  }
};

class Cell {
  private static IDCounter: number = 0;

  private ID: number;
  private next: Cell | null;
  private prev: Cell | null;
  private position: Position;
  private type:'path'|'door'|'void'|'obstacle';

  getPos() {
    return { ...this.position };
  }

  setNext(cell: Cell) {
    this.next = cell;
    this.next.setPrev(this);
  }

  setPrev(cell: Cell) {
    this.prev = cell;
  }

  getNext() {
    return this.next;
  }

  getPrev() {
    return this.prev;
  }

  private setID() {
    this.ID = Cell.IDCounter++;
  }

  constructor({ pos }: { pos: Position , type:'path'|'door'|'void'|'obstacle'}) {
    this.position = pos;
    this.next = null;
    this.prev = null;
    this.setID();
  }
}


class Path {
  type:'path'|'edge';



  constructor (type:'path'|'edge') {

    this.type = type ;

  }
}

export default class LocationManager {
  private locationEdges: {
    width: {
      left: number;
      right: number;
    };
    height: {
      top: number;
      down: number;
    };
  };


  // private path


  private totalCells: number;

  private doors: number;

  private startCell: Cell ;
  private lastCell: Cell ;
  private pathHead: Cell ;
  private static readonly DIRECTIONS: ["up", "right", "down", "left"] = [
    "up",
    "right",
    "down",
    "left",
  ];

  getCellsNumber() {
    return this.totalCells;
  }

  resetIterator() {
    this.pathHead = this.startCell;
  }

  getCell() {
    const next = this.pathHead.getNext();

    if (next) {
      this.pathHead = next;
      return { ...this.pathHead.getPos() };
    } else {
      return null;
    }
  }

  setCell(direction: "up" | "right" | "down" | "left" , type:'path'|'door'|'void'|'obstacle') {
    i = 0;

    const curPos = this.pathHead.getPos();

    const newPos: Position = {
      x: curPos.x + (direction === "right" ? 1 : direction === "left" ? -1 : 0),
      y: curPos.y + (direction === "down" ? 1 : direction === "up" ? -1 : 0),
    };

    const testCell = new Cell({ pos: newPos  , type});

    if (!recursiveCheck(this.pathHead, testCell)) {
      this.pathHead.setNext(testCell);
      const next = this.pathHead.getNext();
      if (next) {
        this.pathHead = next;

        if (this.locationEdges.width.right < curPos.x) {
          this.locationEdges.width.right = curPos.x;
        } else if (this.locationEdges.width.left > curPos.x) {
          this.locationEdges.width.left = curPos.x;
        }

        if (this.locationEdges.height.down < curPos.y) {
          this.locationEdges.height.down = curPos.y;
        } else if (this.locationEdges.height.top > curPos.y) {
          this.locationEdges.height.top = curPos.y;
        }
      }
      this.totalCells++;
      console.log(
        "stats : ",
        this.pathHead,
        this.totalCells,
        this.locationEdges.width.right - this.locationEdges.width.left ,
        this.locationEdges.height.down - this.locationEdges.height.top , 
      );
      return true;
    } else {
      return false;
    }
  }

  constructor({ doors }: { doors: number }) {
    this.startCell = new Cell({ pos: { x: 0, y: 0 } , type:'door' }); // start position
    this.pathHead = this.startCell;
    this.doors = doors;
    this.totalCells = 0;
    this.locationEdges = {
      width: { left: 0, right: 0 },
      height: { top: 0, down: 0 },
    };
  }
}
