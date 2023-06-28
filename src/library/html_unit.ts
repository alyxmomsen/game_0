

export class HTML_unit {

    body:HTMLElement ;
    health:HTMLElement ;
    armor:HTMLElement ;


    reRender({health , armor}:{health:string , armor:string}) {

        this.health.innerText =  health.toString() ;
        this.armor.innerText = armor.toString();

    }

    constructor ({health , armor}:{health:string , armor:string}) {

        this.health.innerText =  health.toString() ;
        this.armor.innerText = armor.toString();
        this.body.append(this.health , this.armor) ;

    }

}