import Game from "./game/game";
import './styles/main.css' ;


(function () {
    const start = true ;
    const root = document.querySelector('.root') ;
    
    if(!start) {
        console.log('switched off');
        return false ;
    }
    else {
        console.log('switched on');
    }

    if(!root) {
        console.log('no root');
        return false ;
    }
    else {
        console.log('root is exist');
    }

    const time = new Date();
    const theGame = new Game () ;


    const mainLoop = function () {

        theGame.update();
        theGame.render();

        root.innerHTML = '' ;
        
        theGame.gameObjects.forEach(elem => {
            root.append(elem.main_html_element);
        });
    
        console.log('webpack game');
    
        window.requestAnimationFrame(mainLoop);
        
    }
    
    window.requestAnimationFrame(mainLoop);

})() ;
