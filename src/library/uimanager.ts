

export class UIManager  {

    canvas:HTMLCanvasElement ;

    draw () {

    }

    update () {

    }

    render () {

    }

    constructor ({canvas}:{canvas:HTMLCanvasElement}) {

        canvas.width = 800 * 2 ;
        canvas.height = 600 * 2 ;

        canvas.style.width = '800px' ;
        canvas.style.height = '600px' ;

        const ctx = canvas.getContext('2d') ;
        ctx.fillStyle = '#000000'
        ctx.fillRect(0 , 0 , 100 , 100);
    }


    ///
}