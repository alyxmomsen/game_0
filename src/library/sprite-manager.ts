import { Damage } from "./damage";
import { TickController } from "./main";
import { Dimensions, Position } from "./types";

class SpriteSet {
  tickController: TickController;
  spriteSrc: HTMLImageElement;
  frames: {
    first: Position;
    currentPos: Position;
    currentStep: number;
    totalSteps: number;
    dimensions: Dimensions;
    step: {
      velocity: {
        x: number;
        y: number;
      };
    };
  };

  getCurrentFrame() {
    return {
      src: this.spriteSrc,
      pos: { ...this.frames.currentPos },
      dim: { ...this.frames.dimensions },
    };
  }

  update() {
    // const tick = this.tickController.tick();

    if (this.tickController.tick()) {
      if (this.frames.totalSteps > this.frames.currentStep) {
        this.frames.currentPos.x += this.frames.step.velocity.x;
        this.frames.currentPos.y += this.frames.step.velocity.y;
        this.frames.currentStep++;
      } else {
        this.frames.currentPos = { ...this.frames.first };
        this.frames.currentStep = 0;
      }

      // console.log(this.frames.currentPos.x, this.frames.currentPos.y);
    }
  }

  constructor(spriteSet: {
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
  }) {
    this.tickController = new TickController(200);
    const img = new Image();
    img.src = spriteSet.spriteSrc;
    this.spriteSrc = img;
    this.frames = {
      currentPos: { ...spriteSet.frames.first },
      currentStep: 0,
      first: { ...spriteSet.frames.first },
      dimensions: { ...spriteSet.frames.dimensions },
      step: {
        velocity: { ...spriteSet.frames.step.velocity },
      },
      totalSteps: spriteSet.frames.total,
    };

    // console.log("first", this.frames.first);
  }
}

export class SpriteManager {
  spriteSets: SpriteSet[];

  getFrame(value: number) {
    this.spriteSets[value].update();
    const frame = this.spriteSets[value].getCurrentFrame();
    // console.log(frame);
    return frame;
  }

  constructor(
    spriteSets: {
      spriteSrc: string;
      frames: {
        first: Position;
        totalSteps: number;
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
    this.spriteSets = [];

    // console.log('spriteset seteted' , this.spriteSets);

    spriteSets.forEach((spriteSet) => {
      // console.log("set spriteset");
      this.spriteSets.push(
        new SpriteSet({
          frames: {
            dimensions: {
              height: spriteSet.frames.dimensions.height,
              width: spriteSet.frames.dimensions.width,
            },
            first: {
              x: spriteSet.frames.first.x,
              y: spriteSet.frames.first.y,
            },
            step: {
              velocity: {
                x: spriteSet.frames.step.velocity.x,
                y: spriteSet.frames.step.velocity.y,
              },
            },
            total: spriteSet.frames.totalSteps,
          },
          spriteSrc: spriteSet.spriteSrc,
        })
      );
    });
  }
}
