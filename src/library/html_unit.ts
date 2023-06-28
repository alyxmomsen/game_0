export class HTML_unit {
  body: HTMLElement;
  health: HTMLElement;
  armor: HTMLElement;

  reRender({ health, armor }: { health: string; armor: string }) {
    this.health.innerText = health.toString();
    this.armor.innerText = armor.toString();
  }

  constructor({
    health,
    armor,
    color,
  }: {
    health: string;
    armor: string;
    color: string;
  }) {
    this.health = document.createElement("div");
    this.health.innerText = health;
    this.armor = document.createElement("div");
    this.armor.innerText = armor;
    this.body = document.createElement("div");
    this.body.append(this.health, this.armor);
    this.body.className = "object-body";
    this.body.style.backgroundColor = color;
  }
}
