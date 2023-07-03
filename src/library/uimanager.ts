import { Dimentions } from "./types";

export class UIManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  gameCellDimentions: Dimentions;

  draw(x: number, y: number, w: number, h: number) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0 , 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(x * this.gameCellDimentions.width, y * this.gameCellDimentions.height , w, h);
  }

  update() {}

  render() {}

  constructor({
    canvas,
    canvasWidth,
    canvasHeight,
    gameCellDimentions ,
  }: {
    canvas: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
    gameCellDimentions:Dimentions ;
  }) {
    this.canvas = canvas;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = "800px";
    canvas.style.height = "600px";
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 100, 100);

    this.ctx = ctx;


    this.gameCellDimentions = {...gameCellDimentions}

    console.log(canvas.width);
    console.log(canvas.height);
  }
}
