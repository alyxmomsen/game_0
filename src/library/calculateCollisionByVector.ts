
export function calculateCollisionByVector(
  objA: {
    position: { x: number; y: number };
    dimentions: { width: number; height: number };
    targetPosition: { x: number; y: number };
  },
  objB: {
    position: { x: number; y: number };
    dimentions: { width: number; height: number };
  }
) {

  const deltaByX = objA.targetPosition.x - objA.position.x;
  const deltaByY = objA.targetPosition.y - objA.position.y;

  if (
    objB.position.x + objB.dimentions.width >=
      (deltaByX > 0 ? objA.position.x : objA.targetPosition.x) &&
    objB.position.x <=
      objA[deltaByX > 0 ? "targetPosition" : "position"].x +
        objA.dimentions.width &&
    objB.position.y + objB.dimentions.height >=
      objA[deltaByY > 0 ? "targetPosition" : "position"].y &&
    objB.position.y <=
      objA[deltaByY > 0 ? "targetPosition" : "position"].y +
        objA.dimentions.height
  ) {
    console.log("! in the box !");

    if (
      objB.position.x <= objA.position.x + objA.dimentions.width &&
      objB.position.x + objB.dimentions.width >= objA.position.x &&
      objB.position.y <= objA.position.y + objA.dimentions.height &&
      objB.position.y + objB.dimentions.height >= objA.position.y
    ) {
      // definitely Collision
      console.log("in the object A's box");
    } else {
      let newX = objA.targetPosition.x;
      let newY = objA.targetPosition.y;

      if (deltaByX !== 0) {
        // delta X is NOT Zero
        objA.position.x + (deltaByX > 0 ? objA.dimentions.width : 0);
        objB.position.x + (deltaByX > 0 ? 0 : objB.dimentions.width);

        newX =
          objB.position.x +
          (deltaByX > 0 ? 0 : objB.dimentions.width) -
          objA.position.x +
          (deltaByX > 0 ? objA.dimentions.width : 0);
      } else {

      }

      if (deltaByY !== 0) {
        // delta X is NOT Zero
        objA.position.y + (deltaByY > 0 ? objA.dimentions.height : 0);
        objB.position.y + (deltaByY > 0 ? 0 : objB.dimentions.height);

        newY =
          objB.position.x +
          (deltaByX > 0 ? 0 : objB.dimentions.width) -
          objA.position.x +
          (deltaByX > 0 ? objA.dimentions.width : 0);
      } else {

      }

      console.log(newX , newY);

      return { x: newX, y: newY };
    }
  } else {
    // collision is NOT
    return objA.targetPosition;
  }

}
