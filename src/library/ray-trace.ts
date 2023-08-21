import Obstacle from "../gameobjects/obstacle";
import { Dimensions, GameObjectExtendsClasses, Position } from "./types";

interface SubjectProps {
  position: Position;
  dimensions: Dimensions;
}

class Subject {
  private position: Position;
  private dimensions: Dimensions;
  private delta: { x: number; y: number };

  getDelta() {
    return { ...this.delta };
  }

  updateDelta() {}

  updatePosition() {
    this.position.x += this.delta.x;
    this.position.y += this.delta.y;
  }

  constructor({ position, dimensions }: SubjectProps) {
    this.position = position;
    this.dimensions = dimensions;
  }
}

export default class PathFinder {
  private subject: Subject;
  private obstacles: Obstacle[];

  private target: {
    obstacle: Obstacle | null;
    position: Position | null;
  };

  setTarget(obstacle: Obstacle) {
    if (obstacle.position) {
      this.target.obstacle = obstacle;
      this.target.position = obstacle.position;
      return true;
    } else {
      return false;
    }
  }

  private updateSubjectPosition() {}

  search() {}

  constructor(subject: SubjectProps, obstacles: Obstacle[]) {
    this.subject = new Subject({ ...subject });
    this.obstacles = obstacles;
    this.target = { obstacle: null, position: null };
  }
}
