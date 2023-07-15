import { TickController } from "./main";

export class SpriteManager_beta {
  tickController: TickController;
  assets: {
    maxAllowFrames: number;
    firstPositionOfX: number;
    spriteImage: HTMLImageElement;
    width: number;
    height: number;
    stepRange: number;
    framePosition: { x: number; y: number };
    currentStep: number;
  }[];

  upDateFrame(assetID: number) {
    if (this.tickController.tick() && this.assets.length) {
      const asset = this.assets[assetID];

      asset.framePosition.x =
        asset.currentStep * asset.stepRange + asset.firstPositionOfX;

      console.log(asset.currentStep, asset.maxAllowFrames);

      if (asset.currentStep + 1 < asset.maxAllowFrames) {
        asset.currentStep++;
      } else {
        asset.currentStep = 0;
      }
    }
  }

  getFrame(assetID: number): {
    spriteImage: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;
  } | null {
    // const a = 'null' ;

    let asset: {
      maxAllowFrames: number;
      firstPositionOfX: number;
      spriteImage: HTMLImageElement;
      width: number;
      height: number;
      stepRange: number;
      framePosition: { x: number; y: number };
      currentStep: number;
    };

    if (this.assets.length) {
      this.upDateFrame(assetID);

      asset = this.assets[assetID];

      return {
        ...asset.framePosition,
        ...asset,
      };
    } else {
      return null;
    }
  }

  test(): null {
    return null;
  }

  constructor(
    assets: {
      maxAllowFrames: number;
      src: string;
      width: number;
      height: number;
      stepRange: number;
      firstFramePosition: { x: number; y: number };
    }[]
  ) {
    this.tickController = new TickController(100);

    this.assets = [];

    assets.forEach((assetInit) => {
      const img = new Image();
      img.src = assetInit.src;

      this.assets.push({
        currentStep: 0,
        width: assetInit.width,
        height: assetInit.height,
        maxAllowFrames: assetInit.maxAllowFrames,
        firstPositionOfX: assetInit.firstFramePosition.x,
        spriteImage: img,
        stepRange: assetInit.stepRange,
        framePosition: assetInit.firstFramePosition,
      });
    });
  }
}
