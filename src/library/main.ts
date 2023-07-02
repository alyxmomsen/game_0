import { Direction } from "../gameobjects/gameobject";

export class Tick {
  private lastTick: number;
  private speed: number;

  tick() {
    const now = Date.now();
    if (now - this.lastTick > this.speed) {
      this.lastTick = now;
      return true;
    } else {
      return false;
    }
  }

  getSpeed() {
    return this.speed;
  }

  setSpeed(value: number) {
    this.speed = value >= 1 ? value : 1; // устанавливаем значение не менее 1
  }

  constructor(speed: number) {
    this.lastTick = 0;
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


