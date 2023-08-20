import { Dimensions, GameObjectExtendsClasses, Position } from "./types";

export default class RayTracing {
  subject: {
    position: Position;
    dimensions: Dimensions;
    delta: { x: number; y: number };
  };

  updatePosition() {}

  constructor(gameObject: { position: Position; dimensions: Dimensions }) {
    this.subject = { ...gameObject, delta: { x: 10, y: 10 } };
  }
}
