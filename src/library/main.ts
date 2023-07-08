import { Dimentions, Direction } from "./types";

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

export function generateMovementDirection(): { x: 0 | 1 | -1; y: -1 | 1 | 0 } {
  const x = Math.floor(Math.random() * 3) - 1;
  const y = Math.floor(Math.random() * 3) - 1;

  return {
    x: x === 1 || x === 0 || x === -1 ? x : 0,
    y: y === 1 || y === 0 || y === -1 ? y : 0,
  };
}
