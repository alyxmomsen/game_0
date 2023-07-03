import { GameObject_part_2 } from "./gameobject-part-2";


export class GameObject_Part_3 extends GameObject_part_2 {

    render() {
        this.UI.render({
          health: this.health.toString(),
          damage: this.attack.currentWeapon?.damage.value.toString(),
          armor: this.armor.health.toString(),
          armor_effeciency: this.armor.dempher.toString(),
        });
    
        this.HTLM_untit.reRender({
          health: this.health.toString(),
          armor: this.armor.health.toString(),
        });
      }

}