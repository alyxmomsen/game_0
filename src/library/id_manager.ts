export class IDManager {
  ids: number[];

  genID() {
    this.ids.push(this.ids[this.ids.length - 1] + 1);
    return this.ids[this.ids.length - 1];
  }

  constructor() {
    this.ids = [0];
  }
}
