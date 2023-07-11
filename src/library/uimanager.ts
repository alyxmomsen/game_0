import { Dimentions } from "./types";

export class UIManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  gameCellDimentions: Dimentions;

  draw(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string = "blue",
    health: number,
    maxHealth: number,
    armorHealth: number,
    maxAH: number
  ) {
    // console.log(maxAH);

    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x /* * this.gameCellDimentions.width */,
      y /* * this.gameCellDimentions.height */,
      w,
      h
    );

    const calculate = function (
      maxBarWide: number,
      maxValue: number,
      currentValue: number
    ) {
      const widePercentagep_1 = maxBarWide / 100;
      const hp_1 = maxValue / 100;
      const hp = currentValue / hp_1;
      const currentWidePercent = widePercentagep_1 * hp;

      // const result = currentWidePercent ;

      return {
        currentPercentOfValue: hp,
        currentPercentOfWide: currentWidePercent,
      };
    };

    let {
      currentPercentOfValue,
      currentPercentOfWide,
    }: {
      currentPercentOfValue: number;
      currentPercentOfWide: number;
    } = calculate(w, maxHealth, health);

    if (currentPercentOfValue < 100) {
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(x, y - 10, currentPercentOfWide, 10);
    }

    const result = calculate(w, maxAH, armorHealth);

    // console.log(result.currentPercentOfValue , result.currentPercentOfWide);

    if (result.currentPercentOfValue < 100) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(x, y - 20, result.currentPercentOfWide, 10);
    }
  }

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

  update() {}

  render() {}

  constructor({
    canvas,
    canvasWidth,
    canvasHeight,
    gameCellDimentions,
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

    console.log(canvas.width);
    console.log(canvas.height);
  }
}
