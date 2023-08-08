import { TickController } from "./main";
import { Dimensions, Position } from "./types";

export class SpriteManager {
  spriteSets: {
    spriteSrc: string;
    frames: {
      first: Position;
      total: number;
      dimensions: Dimensions;
      step: {
        velocity: {
          x: number;
          y: number;
        };
      };
    };
  }[];

  constructor(
    spriteSets: {
      spriteSrc: string;
      frames: {
        first: Position;
        total: number;
        dimensions: Dimensions;
        step: {
          velocity: {
            x: number;
            y: number;
          };
        };
      };
    }[]
  ) {
    if (spriteSets.length) {
    }
  }
}
