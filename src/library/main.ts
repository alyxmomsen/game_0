import { Direction } from "../gameobjects/gameobject";

export class TickController {
  private lastTickTime: number;
  private tickInterval: number;

  tick() {
    const now = Date.now();
    if (now - this.lastTickTime > this.tickInterval) {
      this.lastTickTime = now;
      return true;
    } else {
      return false;
    }
  }

  getTickInterval() {
    return this.tickInterval;
  }

  setTickInterval(value: number) {
    this.tickInterval = value >= 1 ? value : 1; // устанавливаем значение не менее 1
  }

  constructor(initialTickInterval: number) {
    this.lastTickTime = 0;
    this.tickInterval = initialTickInterval < 1 ? 1 : initialTickInterval; // Значение не менее 1;
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
