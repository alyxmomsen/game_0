export type ArmorClass = "heavy" | "light";

export class Armor {
  class: ArmorClass;

  damageInterceptions: number;

  constructor(armorClass: ArmorClass) {
    switch (armorClass) {
      case "heavy":
        // alert("heavy");
        this.damageInterceptions = 80;
        break;
      case "light":
        // alert("light");
        this.damageInterceptions = 40;

        break;
    }

    console.log("armore is plugged");
  }
}
