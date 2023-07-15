import { TickController } from "./main";

export class SpriteManager {
  tickController: TickController;
  assets: {
    length: number;
    src: HTMLImageElement;
    width: number;
    height: number;
    distanceBetween: number;
  }[];

  currentFrame: { x: number; y: number };
  framesAmount: number;

  sprite: {
    frame: { x: number; y: number };
    src: HTMLImageElement;
  };

  getFrame() {
    if (this.tickController.tick()) {
      if (this.currentFrame.x + 1 > 3) {
        this.currentFrame.x = 0;
      } else {
        ++this.currentFrame.x;
      }
    }

    return { x: this.currentFrame.x * 32, y: 0 };
  }

  constructor(src: HTMLImageElement, framesAmount: number) {
    this.sprite = {
      frame: { x: 0, y: 0 },
      src,
    };

    this.currentFrame = { x: 0, y: 0 };

    this.framesAmount = framesAmount;

    this.tickController = new TickController(1000 / 5);

    this.assets;
  }
}
