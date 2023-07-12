import { TickController } from "./main";

export class SpriteManager {
  tickController: TickController;

  currentFrame: {x:number , y:number};
  framesAmount: number;

  sprite: {
    frame: { x: number; y: number };
    src: HTMLImageElement;
  };

  getFrame() {
    if (this.currentFrame.x > 3) {
      this.currentFrame.x = 0;
    }

    if (this.tickController.tick()) {
      this.currentFrame.x++;
    }

    return { x: this.currentFrame.x * 32, y: 0 };
  }

  constructor(src: HTMLImageElement, framesAmount: number) {
    this.sprite = {
      frame: { x: 0, y: 0 },
      src,
    };

    this.currentFrame = {x:0 ,y:0};

    this.framesAmount = framesAmount;

    this.tickController = new TickController(1000 / 5);
  }
}
