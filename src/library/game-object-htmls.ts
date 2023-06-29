export class GameObjectHTMLs {
  wrapper: HTMLElement;

  title:{HTML:HTMLElement , caption:string} ;
  health: {HTML:HTMLElement , caption:string} ;
  armor: {HTML:HTMLElement , caption:string} ;
  damage:{HTML:HTMLElement , caption:string} ;

  render({
    title,
    health,
    armor,
    damage ,
  }: {
    title: string;
    health: string;
    armor: string;
    damage: string ;
  }) {
    this.title.HTML.innerText = title;
    this.health.HTML.innerText = health;
    this.armor.HTML.innerText = armor;
    this.damage.HTML.innerText = damage ;
  }

  constructor({
    title,
    health,
    armor,
    damage ,
  }: {
    title:{value:string , caption:string} ;
    health: {value:string , caption:string};
    armor: {value:string , caption:string};
    damage: {value:string , caption:string} ;
  }) {
    
    const wrap = (val:string , cap:string) => {
      const div1 = document.createElement('div');
      div1.innerText = val ;
      const div2 = document.createElement('div');
      div2.innerText = cap ;
      const wrapper = document.createElement('div');
      wrapper.className = 'wrapper' ;
      wrapper.append(div1 , div2);
      return wrapper ;
    }
    
    this.title = {HTML:wrap(title.value , title.caption) , caption:title.caption} ;
    this.armor = {HTML:wrap(armor.value , armor.caption) , caption:armor.caption} ;
    this.damage = {HTML:wrap(damage.value , damage.caption) , caption:damage.caption} ;
    this.health = {HTML:wrap(health.value , health.caption) , caption:health.caption} ;

  }
}
