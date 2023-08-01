import { Dimentions, Position } from "./types";

export class ViewPort {
  position: Position;
  positionMoveStepRange: { x: number; y: number };
  maxAllowMoveStepRange: number;

  updatePosition() {
    this.position.x += this.positionMoveStepRange.x;
    this.position.y += this.positionMoveStepRange.y;
  }

  updatePositionMoveStepRangeByKeys(keys: string[]) {
    const moveLeft = keys.includes("l");
    const moveRight = keys.includes("j");
    const moveUp = keys.includes("k");
    const moveDown = keys.includes("i");

    const DELTA = 0.01;

    if (moveLeft && !moveRight) {
      if (-this.maxAllowMoveStepRange < this.positionMoveStepRange.x - DELTA) {
        this.positionMoveStepRange.x -= DELTA;
      }
    } else if (!moveLeft && moveRight) {
      if (this.maxAllowMoveStepRange > this.positionMoveStepRange.x + DELTA) {
        this.positionMoveStepRange.x += DELTA;
      }
    } else {
      if (this.positionMoveStepRange.x > 0) {
        if (this.positionMoveStepRange.x - DELTA <= 0) {
          this.positionMoveStepRange.x = 0;
        } else {
          this.positionMoveStepRange.x -= DELTA;
        }
      } else if (this.positionMoveStepRange.x < 0) {
        if (this.positionMoveStepRange.x + DELTA >= 0) {
          this.positionMoveStepRange.x = 0;
        } else {
          this.positionMoveStepRange.x += DELTA;
        }
      }
    }

    if (moveUp && !moveDown) {
      if (-this.maxAllowMoveStepRange < this.positionMoveStepRange.y - DELTA) {
        this.positionMoveStepRange.y -= DELTA;
      }
    } else if (!moveUp && moveDown) {
      if (this.maxAllowMoveStepRange > this.positionMoveStepRange.y + DELTA) {
        this.positionMoveStepRange.y += DELTA;
      }
    } else {
      if (this.positionMoveStepRange.y > 0) {
        if (this.positionMoveStepRange.y - DELTA <= 0) {
          this.positionMoveStepRange.y = 0;
        } else {
          this.positionMoveStepRange.y -= DELTA;
        }
      } else if (this.positionMoveStepRange.y < 0) {
        if (this.positionMoveStepRange.y + DELTA >= 0) {
          this.positionMoveStepRange.y = 0;
        } else {
          this.positionMoveStepRange.y += DELTA;
        }
      }
    }
  }

  autoFocuTo(
    position: Position,
    dimentions: Dimentions,
    canvasDimentions: Dimentions
  ) {
    const range = { x: 2, y: 2 };

    const stopingDelta = { x: 1.2, y: 1.2 };

    const forcageDelta = { x: 1.5, y: 1.5 };

    if (
      position.x >
      this.position.x +
        canvasDimentions.width / 2 +
        canvasDimentions.width / range.x
    ) {
      this.positionMoveStepRange.x += forcageDelta.x;
    } else if (
      position.x + dimentions.width <=
        this.position.x +
          canvasDimentions.width / 2 +
          canvasDimentions.width / range.x &&
      position.x >=
        this.position.x +
          canvasDimentions.width / 2 -
          canvasDimentions.width / range.x
    ) {
      this.positionMoveStepRange.x +=
        this.positionMoveStepRange.x > 0
          ? this.positionMoveStepRange.x - stopingDelta.x > 0
            ? -stopingDelta.x
            : 0
          : this.positionMoveStepRange.x + stopingDelta.x < 0
          ? stopingDelta.x
          : 0;

      // this.positionMoveStepRange.x = 0;
    } else if (
      position.x <
      this.position.x +
        (canvasDimentions.width / 2 - canvasDimentions.width / range.x)
    ) {
      this.positionMoveStepRange.x -= forcageDelta.x;
    }

    if (
      position.y >
      this.position.y +
        canvasDimentions.height / 2 +
        canvasDimentions.height / range.y
    ) {
      this.positionMoveStepRange.y += forcageDelta.y;
    } else if (
      position.y <=
        this.position.y +
          canvasDimentions.height / 2 +
          canvasDimentions.height / range.y &&
      position.y >=
        this.position.y +
          canvasDimentions.height / 2 -
          canvasDimentions.height / range.y
    ) {
      this.positionMoveStepRange.y +=
        this.positionMoveStepRange.y > 0
          ? this.positionMoveStepRange.y - stopingDelta.y > 0
            ? -stopingDelta.y
            : 0
          : this.positionMoveStepRange.y + stopingDelta.y < 0
          ? stopingDelta.y
          : 0;

      // this.positionMoveStepRange.x = 0;
    } else if (
      position.y <
      this.position.y +
        canvasDimentions.height / 2 -
        canvasDimentions.height / range.y
    ) {
      this.positionMoveStepRange.y -= forcageDelta.y;
    }
  }

  constructor() {
    this.position = { x: 0, y: 0 };
    this.positionMoveStepRange = { x: 0, y: 0 };
    this.maxAllowMoveStepRange = 2;
  }
}
