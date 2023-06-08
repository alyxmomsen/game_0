export default class GameObject {


    id = undefined ;
    health = 100 ;
    damage = 10 ;
    armor = 100 ;



    /* ---------------------- */
    i_button_attack ;
    i_display ;
    main_html_element ;

    render () {

        this.i_display.innerText = this.health ;

    }

    constructor(id) {

        this.id = id ;
        console.log('game object' , this.id);

        this.i_button_attack = document.createElement('button');
        this.i_button_attack.className = 'attack-button'
        this.i_button_attack.innerText = 'attack' ;

        this.i_display = document.createElement('span');
        this.i_display.className = 'display-health'
        this.i_display.innerText = this.health ;

        this.main_html_element = document.createElement('div');
        this.main_html_element.className = 'object-body' ;
        this.main_html_element.append(this.i_button_attack , this.i_display);
    }
}