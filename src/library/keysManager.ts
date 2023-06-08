export default class KeysManager {
  pressedKeys: string[] = [];

  getPressedKeys() {
    return [...this.pressedKeys];
  }

  constructor() {
    window.onkeydown = (e) => {
      const pressedKey = e.key;
      let isKeyExist = false;
      for (let i = 0; i < this.pressedKeys.length; i++) {
        if (this.pressedKeys[i] === e.key) {
          isKeyExist = true;
        }
      }

      if (!isKeyExist) {
        this.pressedKeys.push(pressedKey);
        // console.log(e.key);
      }
    };

    window.onkeyup = (e) => {
      this.pressedKeys = this.pressedKeys.filter((elem, i) =>
        elem === e.key ? false : true
      );
    };
  }
}
