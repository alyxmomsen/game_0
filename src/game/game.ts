// import GameObject, { Enemy } from "../gameobjects/gameobject";
import { Bullet } from "../gameobjects/bullet";
import { Enemy } from "../gameobjects/enemy";
import GameObject, {
  Dimentions,
  GameObjectConstructor,
  GameObjectType,
  Position,
} from "../gameobjects/gameobject";
import { Player } from "../gameobjects/player";
import { ArmorClass } from "../library/armore";
import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import { generatePostion } from "../library/generatePosition";
import KeysManager from "../library/keysManager";
import { Tick, buildField, generateColor } from "../library/main";




export default class Game {
  


  // hero: GameObject = null;
  field: { dimentions: Dimentions };
  
  
  enemies: GameObject[] = [];
  gameObjects: GameObject[] = [];
  bullets: GameObject[] = [] ;
  // объект игрока
  player: Player;



  // Объект менеджера ключей клавиш
  keysManager: KeysManager = null;

  /* ======== html ========== */

  infcDisplay: HTMLElement = null;

  /* ======================== */


  createGameObject({
    kind = "game_object",
    damaged,
    fieldDimentions,
  }: {
    kind: GameObjectType;
    damaged: Damage[];
    fieldDimentions: { width: number; height: number };
  }) {
    let doLoopAgain = false; // флаг для повторной генерации рандомного ID, если обнаружен дублирующий ID
    let newID: number = 0;

    let counter = 0;
    do {
      // console.log('iter' , ++counter);

      newID = Math.floor(Math.random() * 1000); /* Number.parseInt('1'); */

      for (let i = 0; i < this.gameObjects.length; i++) {
        if (this.gameObjects[i].id === newID) {
          doLoopAgain = true;
          break;
        }
        doLoopAgain = false;
      }
    } while (doLoopAgain);

    /* =================================== */

    /* ====================================== */

    // объект автоматического выбора класса

    const obj = {
      enemy: () => {
        return new Enemy({
          id: newID,
          armorKind: "heavy",
          damaged: [],
          position: generatePostion({ width: 60, height: 40 }),
        });
      },
      player: () => {
        return new Player({
          id: newID,
          armorKind: "heavy",
          damaged: [],
          position: generatePostion({ width: 60, height: 40 }),
        });
      },
      game_object: () => {
        return new GameObject({
          id: newID,
          armorKind: "heavy",
          damaged: [],
          kind: "game_object",
          position: generatePostion({ width: 60, height: 40 }),
          backgroundColor: "grey",
          walkSpeed: 10,
          color: "grey",
          damage: new Damage('phisical' , 0) ,
        });
      },
      "damage-entity": () => {
        return new GameObject({
          id: newID,
          armorKind: "heavy",
          damaged: [],
          kind: "game_object",
          position: generatePostion({ width: 60, height: 40 }),
          backgroundColor: "white",
          walkSpeed: 10,
          color: "white",
          damage:new Damage('phisical' , 100) ,
        });
      },
    };

    return obj[kind]();
  }

  update() {
    
    /* Game управляет действиями Player (bdw, возможно они названны иначе, но это "пока" )
    на самом деле, как правило, игра сама наносит урон другим объектам, не создавая событие Attack у Player

    так же Player, как и другие объекты могут генерировать состояния такие как голод , усталость и т. д. */

    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();
    
    this.bullets.forEach(elem => {
      
      elem.update({keys , damage:100 , objects:[...this.enemies , this.player]});

    });
    
    // обновление объектов 
    this.player.update({ keys, damage: 0, objects: [] }) ;
    
    this.enemies.forEach((enemy, i) => {
      enemy.update({
        keys,
        damage: 0,
        objects: [...this.enemies, this.player],
      });
    });

    /* generation objects */

    if(this.player.attack.status) {
      
      this.bullets.push(new Bullet({position:{x:this.player.position.x + 1 , y:this.player.position.y}}));
      this.player.attack.reset(); 
    }
    
    
    /* ================== */
  }

  renderGameObject({ elem, field }: { elem: GameObject; field: HTMLElement }) {
    // console.log('field' , field);

    if (
      field &&
      field.childNodes[0]?.childNodes[elem.position.y]?.childNodes[
        elem.position.x
      ] !== undefined
    ) {
      field.childNodes[0]?.childNodes[elem.position.y]?.childNodes[
        elem.position.x
      ].appendChild(elem.main_html_element);

      elem.render();
    }
  }

  render(field: HTMLElement = null) {

    this.bullets.forEach(elem => {
      this.renderGameObject({elem , field});
    });

    this.renderGameObject({ elem: this.player, field });

    this.gameObjects.forEach((elem) => {
      this.renderGameObject({ elem, field });
    });

    this.enemies.forEach((elem) => {
      this.renderGameObject({ elem, field });
    });
  }

  constructor({
    root,
    infcDisplay,
    fieldDimentions,
  }: {
    root: HTMLElement;
    infcDisplay: HTMLElement;
    fieldDimentions: { width: number; height: number };
  }) {
    this.keysManager = new KeysManager();
    this.field = { dimentions: fieldDimentions };
    
    this.infcDisplay = infcDisplay;

    


    root.append(
      buildField(this.field.dimentions.height, this.field.dimentions.width)
    );


    //////////////////////////////////

    this.player = new Player({
      id: 0,
      armorKind: "light",
      damaged: [],
      position: generatePostion(this.field.dimentions),
    });

    this.gameObjects.push(
      this.createGameObject({
        damaged: [],
        kind: "game_object",
        fieldDimentions,
      })
    );
    this.gameObjects.push(
      this.createGameObject({
        damaged: [],
        kind: "game_object",
        fieldDimentions,
      })
    );
    this.gameObjects.push(
      this.createGameObject({
        damaged: [],
        kind: "game_object",
        fieldDimentions,
      })
    );

    this.enemies.push(
      this.createGameObject({
        kind: "enemy",
        damaged: [],
        fieldDimentions,
      })
    );
    this.enemies.push(
      this.createGameObject({
        kind: "enemy",
        damaged: [],
        fieldDimentions,
      })
    );
    this.enemies.push(
      this.createGameObject({
        kind: "enemy",
        damaged: [],
        fieldDimentions,
      })
    );

    //////////////////////////////////////////////

    this.enemies.forEach((enemy) => {
      this.infcDisplay.append(enemy.infc_display.mainHTMLElement);
    });

    this.infcDisplay.append(this.player.infc_display.mainHTMLElement);
  }
}
