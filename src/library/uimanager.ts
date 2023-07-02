

export class UIManager  {

    canvas:HTMLCanvasElement ;
    ctx:CanvasRenderingContext2D ;

    draw (x:number ,y:number) {
        this.ctx.fillStyle = 'black' ;
        this.ctx.fillRect(0 , 0 , this.canvas.width , this.canvas.height) ;
        this.ctx.fillStyle = 'blue' ;
        this.ctx.fillRect(x * 50 , y * 50 , 50 , 50) ;
    }

    update () {

    }

    render () {

    }

    constructor ({canvas , w , h}:{canvas:HTMLCanvasElement , w:number , h:number}) {
        
        this.canvas = canvas ;

        canvas.width = w * 100 ;
        canvas.height = h * 100 ;

        canvas.style.width = '800px' ;
        canvas.style.height = '600px' ;

        const ctx = canvas.getContext('2d') ;
        ctx.fillStyle = '#000000'
        ctx.fillRect(0 , 0 , 100 , 100);

        this.ctx = ctx ;

        console.log(canvas.width);
        console.log(canvas.height);
        
    }

}