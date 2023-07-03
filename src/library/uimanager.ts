import { Dimentions } from "./types";

export class UIManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  gameCellDimentions:Dimentions ;

  draw(x: number, y: number) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(x * 50, y * 50, 50, 50);
  }

  update() {}

  render() {}

  constructor({
    canvas,
    canvasWidth: w,
    canvasHeight: h,
  }: {
    canvas: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
  }) {
    this.canvas = canvas;

    canvas.width = w;
    canvas.height = h * 100;

    canvas.style.width = "800px";
    canvas.style.height = "600px";

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 100, 100);

    this.ctx = ctx;

    console.log(canvas.width);
    console.log(canvas.height);
  }
}
