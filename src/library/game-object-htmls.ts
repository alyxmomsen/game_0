import { UI_stat } from "./types";

export class GameObjectHTMLs {
  health: UI_stat;
  damage: UI_stat;
  armor: UI_stat;
  armor_effeciency: UI_stat;

  render({
    health,
    damage,
    armor,
    armor_effeciency,
  }: {
    health: string;
    damage: string;
    armor: string;
    armor_effeciency: string;
  }) {
    this.health.linkHTML.value.innerText = health;
    this.damage.linkHTML.value.innerText = damage;
    this.armor.linkHTML.value.innerText = armor;
    this.armor_effeciency.linkHTML.value.innerText = armor_effeciency;
  }

  constructor({
    health,
    damage,
    armor,
    armor_effeciency,
  }: {
    health: string;
    damage: string;
    armor: string;
    armor_effeciency: string;
  }) {
    const setStat = ({
      caption,
      value,
    }: {
      caption: string;
      value: string;
    }) => {
      const prop: UI_stat = {
        linkHTML: {
          value: document.createElement("div"),
          caption: document.createElement("div"),
          wrapper: document.createElement("div"),
        },
        data: {
          value: value,
          caption: caption,
        },
      };

      prop.linkHTML.value.innerText = value;
      prop.linkHTML.value.className = "player-a-stat value";

      prop.linkHTML.caption.innerText = caption;
      prop.linkHTML.caption.className = "player-a-stat caption";

      prop.linkHTML.wrapper.className = "player-stat-wrapper";
      prop.linkHTML.wrapper.append(prop.linkHTML.caption, prop.linkHTML.value);

      return prop;
    };

    this.health = setStat({ value: health, caption: "HEalTH" });
    this.armor = setStat({ value: armor, caption: "ARMor" });
    this.damage = setStat({ value: damage, caption: "DAmAGE" });
    this.armor_effeciency = setStat({
      value: armor_effeciency,
      caption: "armor eff",
    });
  }
}
