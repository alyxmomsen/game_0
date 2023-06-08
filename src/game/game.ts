import GameObject from "../gameobjects/gameobject";
import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import KeysManager from "../library/keysManager";
import { Tick, buildField, generateColor } from "../library/main";

export default class Game {
  actions: { from: number; to: number; action: Attack }[];
  gameObjects: GameObject[] = [];
  enemies: GameObject[] = [];
  hero: GameObject = null;
  MAX_FIELD_X = 40;
  MAX_FIELD_Y = 40;





  keysManager: KeysManager = null;

  /* ======== html ========== */

  infcDisplay: HTMLElement = null;

  /* ======================== */

  /* experimental fields */

  randomDamageTick = new Tick(100);

  autoDamage() {}

  /* ==================== */

  createGameObject({
    backgroundColor = "grey",
    kind = "game_object",
    damaged,
  }: {
    backgroundColor: string;
    kind: string;
    damaged: Damage | null;
  }) {
    let doLoopAgain = false;
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

    return new GameObject({
      id: newID,
      fildMaxRows: this.MAX_FIELD_Y,
      fildMaxCols: this.MAX_FIELD_X,
      backgroundColor,
      kind,
      armorKind: "light",
      damaged,
    });
  }

  update() {
    // Game управляет действиями Player (bdw, возможно они названны иначе, но это "пока" )
    // на самом деле, как правило, игра сама наносит урон другим объектам, не создавая событие Attack у Player

    // так же Player, как и другие объекты могут генерировать состояния такие как голод , усталость и т. д.

    /* const randomizer = () => {
      const ids: number[] = [];

      this.enemies.forEach((element) => {
        ids.push(element.id);
      });

      return ids[Math.floor(Math.random() * this.enemies.length)];
    };

    randomizer(); */

    const keys = this.keysManager.getPressedKeys();

    console.log(`${this.hero.outerActions()}`);
    // this.hero.interActions();
    this.hero.update({ keys, damage: 0 });

    /* рандомное нанесение урона Enemies. для тестирования принципа нанесения урона */
    if (this.randomDamageTick.tick()) {
      // console.log('ticktick');
      this.enemies[
        Math.floor(Math.random() * this.enemies.length)
      ].interActions({ damage: new Damage("phisical", 10) });
    }

    
    /* ====================================================================== */

    this.enemies.forEach((enemy, i) => {
      enemy.update({ keys, damage: 0 });
    });
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
    this.renderGameObject({ elem: this.hero, field });

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
  }: {
    root: HTMLElement;
    infcDisplay: HTMLElement;
  }) {
    this.infcDisplay = infcDisplay;

    this.keysManager = new KeysManager();

    root.append(buildField(this.MAX_FIELD_Y, this.MAX_FIELD_X));

    this.hero = this.createGameObject({
      backgroundColor: "red",
      kind: "player",
      damaged: null,
    });

    this.gameObjects.push(
      this.createGameObject({
        backgroundColor: generateColor(6),
        damaged: null,
        kind: "game-object",
      })
    );
    this.gameObjects.push(
      this.createGameObject({
        backgroundColor: generateColor(6),
        damaged: null,
        kind: "game-object",
      })
    );
    this.gameObjects.push(
      this.createGameObject({
        backgroundColor: generateColor(6),
        damaged: null,
        kind: "game-object",
      })
    );

    this.enemies.push(
      this.createGameObject({
        backgroundColor: generateColor(3),
        kind: "enemy",
        damaged: new Damage("phisical", 10),
      })
    );
    this.enemies.push(
      this.createGameObject({
        backgroundColor: generateColor(3),
        kind: "enemy",
        damaged: null,
      })
    );
    this.enemies.push(
      this.createGameObject({
        backgroundColor: generateColor(3),
        kind: "enemy",
        damaged: null,
      })
    );

    this.enemies.forEach((enemy) => {
      this.infcDisplay.append(enemy.infc_display.mainHTMLElement);
    });
  }
}
