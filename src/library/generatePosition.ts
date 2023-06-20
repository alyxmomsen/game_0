import { Dimentions, Position } from "../gameobjects/gameobject";

export function generatePostion(limits: Dimentions): Position {
  return {
    x: Math.floor(Math.random() * limits.width),
    y: Math.floor(Math.random() * limits.height),
  };
}
