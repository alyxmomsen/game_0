import { Dimensions, Position } from "./types";

export function generatePostion(limits: Dimensions): Position {
  return {
    x: Math.floor(Math.random() * limits.width),
    y: Math.floor(Math.random() * limits.height),
  };
}
