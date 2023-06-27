
export class GameObjectUI_HTML {

    wrapper:HTMLElement ;

    title:HTMLElement ;
    health:HTMLElement  ;
    armor:HTMLElement ;  

    update({title , health , armor}:{title:string ; health:string ; armor:string}) {
        
        this.title.innerText = title ;
        this.health.innerText = health ;
        this.armor.innerText = armor ;
    }

    constructor ({title , health , armor}:{title:string ; health:string ; armor:string}) {
        this.title = document.createElement('div');
        this.title.innerText = title ;
        this.health = document.createElement('div');
        this.health.innerText = health ;
        this.armor = document.createElement('div');
        this.armor.innerText = armor ;

        this.wrapper = document.createElement('div') ;
        this.wrapper.append(this.title , this.armor , this.health ) ;
    }
}