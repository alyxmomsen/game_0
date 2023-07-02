import GameObject, { Direction } from "../gameobjects/gameobject";

export class Tick {

  private lastTick: number;
  private speed:number;

  tick() {
    const now = Date.now();
    if (now - this.lastTick > this.speed) {
      this.lastTick = now;
      return true;
    } else {
      return false;
    }
  }

  getSpeed() { return this.speed }

  setSpeed(value:number) { 
    this.speed = value >= 1 ? value : 1 ; // устанавливаем значение не менее 1
  }

  constructor(speed:number) {

    this.lastTick = 0 ;
    this.speed = speed < 1 ? 1 : speed; // Значение не менее 1;

  }
}

export function calculateMovementDirection(keys: string[]): Direction {
  let w = keys.includes("w");
  let s = keys.includes("s");
  let a = keys.includes("a");
  let d = keys.includes("d");

  const f = function (a: boolean, b: boolean) {
    if (a && !b) {
      return -1;
    } else if (b && !a) {
      return 1;
    } else if ((!a && !b) || (a && b)) {
      return 0;
    } else {
      return 0;
    }
  };

  return { x: f(a, d), y: f(w, s) };
}

export function generateMovementDirection(): { x: 0 | 1 | -1; y: -1 | 1 | 0 } {
  const x = Math.floor(Math.random() * 3) - 1;
  const y = Math.floor(Math.random() * 3) - 1;

  return {
    x: x === 1 || x === 0 || x === -1 ? x : 0,
    y: y === 1 || y === 0 || y === -1 ? y : 0,
  };
}

export function buildGameObjectStatsHTMLElement({
  objectTitle,
  newId,
  armor,
}: {
  objectTitle: string;
  newId: number;
  armor: number;
}) {
  const mainHTMLElement = document.createElement("div");
  mainHTMLElement.className = "object-stats";

  const title = document.createElement("div");
  title.className = "object-stat title";
  title.innerText = objectTitle;

  const health = document.createElement("div");
  health.className = "object-stat health";

  const id = document.createElement("div");
  id.className = "object-stat id";
  id.innerText = newId.toLocaleString();

  const armore = document.createElement("div");
  armore.className = "object-stat armor";
  armore.innerText = `${armor}`;

  mainHTMLElement.append(title, health, armore);

  const obj = {
    title,
    health,
    // id,
    mainHTMLElement,
    armor: armore,
  };

  // console.log('obj' , obj);

  return obj;
}

export function buildField(maxRows: number, maxCols: number) {
  const cell = document.createElement("div");
  cell.className = "game-cell";
  const fieldBorder = document.createElement("div");
  fieldBorder.className = "game-field";
  const gameFieldRow = document.createElement("div");
  gameFieldRow.className = "game-field-row";
  let newRow = null;
  let newCell = null;
  for (let i = 0; i < maxRows; i++) {
    newRow = document.createElement("div");
    newRow.className = "game-field-row";
    fieldBorder.append(newRow);

    for (let j = 0; j < maxCols; j++) {
      newCell = document.createElement("div");
      newCell.className = "game-cell";

      if (true) {
      }
      newRow.append(newCell);
    }
  }

  return fieldBorder;
}

export function generateColor(length = 3) {
  let str = "#";

  function numberToChar() {
    const arr = ["a"];

    return "";
  }

  for (let i = 0; i < length; i++) {
    str += `${Math.floor(Math.random() * 10)}`;
  }

  return str;
}

export function generateUniqueID(ids: { id: number; object: GameObject }[]) {
  return 0;
}
