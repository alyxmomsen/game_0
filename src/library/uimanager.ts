import { Dimentions } from "./types";

export class UIManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  gameCellDimentions: Dimentions;

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

  constructor({
    canvas ,
    canvasWidth ,
    canvasHeight ,
    gameCellDimentions ,
  }: {
    canvas: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
    gameCellDimentions: Dimentions;
  }) {
    this.canvas = canvas;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // canvas.style.width = "800px";
    // canvas.style.height = "600px";
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 100, 100);

    this.ctx = ctx;

    this.gameCellDimentions = { ...gameCellDimentions };
  }
}
