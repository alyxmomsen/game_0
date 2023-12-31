import { Dimensions } from "./types";

export class UIManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  gameCellDimentions: Dimensions;

  drawSprite(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ) {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  clearCanvas() {
    this.ctx.fillStyle = "#20242f";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderPlayerStats(values: string[]) {
    values.forEach((stat, i) => {
      this.ctx.globalAlpha = 1;
      this.ctx.font = "24px serif";
      this.ctx.fillStyle = "whitesmoke";
      this.ctx.fillText(stat, 100, i * 25 + 100);
    });
  }

  constructor({
    canvas,
    canvasWidth,
    canvasHeight,
    gameCellDimentions,
  }: {
    canvas: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
    gameCellDimentions: Dimensions;
  }) {
    this.canvas = canvas;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 100, 100);

      this.ctx = ctx;

      this.gameCellDimentions = { ...gameCellDimentions };
    } else {
      console.log("ctx is NULL");
    }
  }
}
