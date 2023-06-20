export class Tick {
  currentTick;
  speed = 0;

  tick() {
    const now = Date.now();

    if (now - this.currentTick > this.speed) {
      this.currentTick = now;
      return true;
    } else {
      return false;
    }
  }

  setSpeed(value: number = 0) {
    if (value >= 0) {
      this.speed = value;
    } else {
      this.speed = 0;
    }
  }

  constructor(speed = 0) {
    if (speed < 0) {
      speed = 0;
    }
    this.speed = speed;
    this.currentTick = Date.now();
  }
}

export function calculateMovementDirection(keys: string[]): {
  x: 0 | 1 | -1;
  y: 0 | 1 | -1;
} {
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
}: {
  objectTitle: string;
  newId: number;
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

  mainHTMLElement.append(title, health, id);

  const obj = {
    title,
    health,
    id,
    mainHTMLElement,
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
