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

  constructor(speed = 0) {
    if (speed < 0) {
      speed = 0;
    }
    this.speed = speed;
    this.currentTick = Date.now();
  }
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
