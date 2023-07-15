import { Dimentions, Position } from "./types";

export function calculateCollisionByVector(
  objA: {
    position: { x: number; y: number };
    dimentions: { width: number; height: number };
    targetPosition: { x: number; y: number };
  },
  objB: {
    position: { x: number; y: number };
    dimentions: { width: number; height: number };
  }
) {
  // let direction: { x: -1 | 0 | 1; y: -1 | 0 | 1 } = { x: 0, y: 0 };

  const deltaByX = objA.targetPosition.x - objA.position.x; // значение (number | 0) и полярность дельты
  const deltaByY = objA.targetPosition.y - objA.position.y; // значение (number | 0) и полярность дельты

  const distanceByX = objB.position.x - objA.position.x;
  const distanceByY = objB.position.y - objA.position.y;

  
  



  return { x: true, y: false };
}
