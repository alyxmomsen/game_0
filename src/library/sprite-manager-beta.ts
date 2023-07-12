
import { TickController } from "./main";

export class SpriteManager_beta {
  tickController: TickController;
  assets:{
    maxAllowFrames:number ;
    firstPositionOfX:number ;
    src:HTMLImageElement ;
    width:number ;
    height:number ;
    stepRange:number ;
    framePosition:{x:number , y:number} ;
    currentStep:number ;
  }[] ;

  upDateFrame (assetID:number) {

    if(this.tickController.tick() && this.assets.length) {

        const asset = this.assets[assetID] ;
    
        asset.framePosition.x = (asset.currentStep * asset.stepRange) + asset.firstPositionOfX ;
    
        console.log(asset.currentStep , asset.maxAllowFrames);

        if(asset.currentStep + 1 < asset.maxAllowFrames) {
            asset.currentStep++ ;

            // console.log('update frame start');
        }
        else {

            
            asset.currentStep = 0 ;
        }
    }
  }

  getFrame(assetID:number):{
    src:HTMLImageElement ;
    x:number ;
    y:number ;
    width:number ;
    height:number ;
  } {

    this.upDateFrame(assetID);
    
    const asset = this.assets[assetID] ;

    return {
        src : asset.src ,
        x :asset.framePosition.x , 
        y : asset.framePosition.y ,
        width : asset.width ,
        height : asset.height ,
    }
  }

    constructor(assets:{
        maxAllowFrames:number ;
        src:HTMLImageElement ;
        width:number ;
        height:number ;
        stepRange:number ;
        firstFramePosition:{x:number , y:number}
    }[]) {

        this.tickController = new TickController (100) ;

        this.assets = [] ;
        
        assets.forEach(assetInit => {
            this.assets.push({
                currentStep : 0 ,
                width : assetInit.width ,
                height : assetInit.height ,
                maxAllowFrames : assetInit.maxAllowFrames ,
                firstPositionOfX : assetInit.firstFramePosition.x ,
                src : assetInit.src ,
                stepRange : assetInit.stepRange ,
                framePosition : assetInit.firstFramePosition ,
            });
        });
    }

  }


 

  