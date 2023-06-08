import { Tick } from "../library/main";

export function heroActions({ keys = [] }: { keys: string[] }) {
  if (keys.includes("g")) {
    if (!this.shot_options.ticker) {
      this.shot_options.ticker = new Tick(this.shot_options.speed);
      // console.log('yahoo it s gggggg') ;
    } else if (this.shot_options.ticker.tick()) {
      // console.log('yahoo it s gggggg') ;
    }
  }
}

export function moveHero({ keys = [] }: { keys: string[] }) {
  if (keys.includes("w")) {
    if (!this.walkSpeed.ticker) {
      this.walkSpeed.ticker = new Tick(this.walkSpeed.velocity);
      this.position.y--;
    } else {
      if (this.walkSpeed.ticker.tick()) {
        this.position.y--;
      }
    }
  } else {
    this.walkSpeed.tick = null;
  }

  if (keys.includes("s")) {
    if (!this.walkSpeed.ticker) {
      this.walkSpeed.ticker = new Tick(this.walkSpeed.velocity);
      this.position.y++;
    } else {
      if (this.walkSpeed.ticker.tick()) {
        this.position.y++;
      }
    }
  } else {
    this.walkSpeed.tick = null;
  }

  if (keys.includes("a")) {
    if (!this.walkSpeed.ticker) {
      this.walkSpeed.ticker = new Tick(this.walkSpeed.velocity);
      this.position.x--;
    } else {
      if (this.walkSpeed.ticker.tick()) {
        this.position.x--;
      }
    }
  } else {
    this.walkSpeed.tick = null;
  }

  if (keys.includes("d")) {
    if (!this.walkSpeed.ticker) {
      this.walkSpeed.ticker = new Tick(this.walkSpeed.velocity);
      this.position.x++;
    } else {
      if (this.walkSpeed.ticker.tick()) {
        this.position.x++;
      }
    }
  } else {
    this.walkSpeed.tick = null;
  }

  // if(keys.includes(''))
}
