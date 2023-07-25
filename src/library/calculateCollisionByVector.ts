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

  let newX_delta = 0;
  let newY_delta = 0;

  if (
    (deltaByX > 0
      ? objB.position.x + objB.dimentions.width >= objA.position.x &&
        objB.position.x <= objA.targetPosition.x + objA.dimentions.width
      : objB.position.x <= objA.position.x + objA.dimentions.width &&
        objB.position.x + objB.dimentions.width >= objA.targetPosition.x) &&
    (deltaByY > 0
      ? objB.position.y + objB.dimentions.height >= objA.position.y &&
        objB.position.y <= objA.targetPosition.y + objA.dimentions.height
      : objB.position.y <= objA.position.y + objA.dimentions.height &&
        objB.position.y + objB.dimentions.height >= objA.targetPosition.y)
  ) {
    // console.log("! in the box !");

    if (
      objB.position.x <= objA.position.x + objA.dimentions.width &&
      objB.position.x + objB.dimentions.width >= objA.position.x &&
      objB.position.y <= objA.position.y + objA.dimentions.height &&
      objB.position.y + objB.dimentions.height >= objA.position.y
    ) {
      return true;
    } else {
      if (deltaByX !== 0) {
        newX_delta =
          objB.position.x +
          (deltaByX > 0 ? 0 : objB.dimentions.width) -
          (objA.position.x + (deltaByX > 0 ? objA.dimentions.width : 0));
      } else {
      }

      if (deltaByY !== 0) {
        newY_delta =
          objB.position.y +
          (deltaByY > 0 ? 0 : objB.dimentions.height) -
          (objA.position.y + (deltaByY > 0 ? objA.dimentions.height : 0));
      } else {
      }

      const testByX = { x: 0, y: 0 };
      const testByY = { x: 0, y: 0 };

      if (deltaByX !== 0 && deltaByY !== 0) {
        testByX.x = objA.position.x + newX_delta;
        testByX.y = (deltaByY / deltaByX) * newX_delta;

        testByY.y = objA.position.y + newY_delta;
        testByY.x = (deltaByX / deltaByY) * newY_delta;
      } else {
        testByX.x = objA.position.x + newX_delta;
        testByX.y = objA.position.y;

        testByY.y = objA.position.y + newY_delta;
        testByY.x = objA.position.x;
      }

      let collisionByTestX = false;
      let collisionByTestY = false;

      if (
        testByX.x + objA.dimentions.width >= objB.position.x &&
        testByX.x <= objB.position.x + objB.dimentions.width &&
        testByX.y + objA.dimentions.height >= objB.position.y &&
        testByX.y >= objB.position.y + objB.dimentions.height
      ) {
        collisionByTestX = true;
      }


      if (
        testByY.x + objA.dimentions.width >= objB.position.x &&
        testByY.x <= objB.position.x + objB.dimentions.width &&
        testByY.y + objA.dimentions.height >= objB.position.y &&
        testByY.y >= objB.position.y + objB.dimentions.height
      ) {
        collisionByTestY = true;
      }


      collisionByTestX ? console.log('XXX') : null ;
      collisionByTestY ? console.log('YYY') : null ;

      // console.log('new delta');
      // console.log(newX_delta, newY_delta);
    }

    return true;
  } else {
    // console.log(newX_delta, newY_delta);

    false;
  }
}
