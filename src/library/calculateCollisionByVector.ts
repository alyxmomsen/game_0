import { Position } from "./types";

export function calculateCollisionByVector(
  movingObject: {
    position: { x: number; y: number };
    dimentions: { width: number; height: number };
    targetPosition: { x: number; y: number };
  },
  stationaryObject: {
    position: { x: number; y: number };
    dimentions: { width: number; height: number };
  }
): { position: Position; collision: boolean } {
  const deltaX = movingObject.targetPosition.x - movingObject.position.x;
  const deltaY = movingObject.targetPosition.y - movingObject.position.y;

  let collision = false;

  // Check if the objects overlap
  if (
    (deltaX > 0
      ? stationaryObject.position.x + stationaryObject.dimentions.width >=
          movingObject.position.x &&
        stationaryObject.position.x <=
          movingObject.targetPosition.x + movingObject.dimentions.width
      : stationaryObject.position.x <=
          movingObject.position.x + movingObject.dimentions.width &&
        stationaryObject.position.x + stationaryObject.dimentions.width >=
          movingObject.targetPosition.x) &&
    (deltaY > 0
      ? stationaryObject.position.y + stationaryObject.dimentions.height >=
          movingObject.position.y &&
        stationaryObject.position.y <=
          movingObject.targetPosition.y + movingObject.dimentions.height
      : stationaryObject.position.y <=
          movingObject.position.y + movingObject.dimentions.height &&
        stationaryObject.position.y + stationaryObject.dimentions.height >=
          movingObject.targetPosition.y)
  ) {
    // Collision detected

    // Calculate collision depth in the x and y directions

    const collisionDepth = {
      x:
        deltaX !== 0
          ? movingObject.targetPosition.x +
            (deltaX > 0 ? movingObject.dimentions.width : 0) -
            (stationaryObject.position.x +
              (deltaX > 0 ? 0 : stationaryObject.dimentions.width))
          : 0,
      y:
        deltaY !== 0
          ? movingObject.targetPosition.y +
            (deltaY > 0 ? movingObject.dimentions.height : 0) -
            (stationaryObject.position.y +
              (deltaY > 0 ? 0 : stationaryObject.dimentions.height))
          : 0,
    };

    // Define test movement vectors
    let testMovementVector1 = { x: 0, y: 0 };
    let testMovementVector2 = { x: 0, y: 0 };

    if (collisionDepth.x === 0 && collisionDepth.y === 0) {
      // No collision depth in any direction

      testMovementVector1.x = 0;
      testMovementVector1.y = 0;

      testMovementVector2 = testMovementVector1;
    } else if (collisionDepth.x !== 0 && collisionDepth.y === 0) {
      // Collision depth in the x direction only

      testMovementVector1.x =
        deltaX > 0
          ? collisionDepth.x > 0
            ? deltaX - collisionDepth.x
            : 0
          : collisionDepth.x < 0
          ? deltaX - collisionDepth.x
          : 0;

      testMovementVector1.y = 0;
      testMovementVector2 = testMovementVector1;
      // console.log("x");
    } else if (collisionDepth.x === 0 && collisionDepth.y !== 0) {
      // Collision depth in the y direction only
      testMovementVector1.y =
        deltaY > 0
          ? collisionDepth.y > 0
            ? deltaY - collisionDepth.y
            : 0
          : collisionDepth.y < 0
          ? deltaY - collisionDepth.y
          : 0;
      testMovementVector1.x = 0;

      testMovementVector2 = testMovementVector1;
      // console.log("y");
    } else if (collisionDepth.x !== 0 && collisionDepth.y !== 0) {
      // Collision depth in both x and y directions
      if (deltaX > 0 && deltaY > 0) {
        // Calculate test movement vector for x direction

        testMovementVector1.x =
          deltaX - collisionDepth.x > 0
            ? deltaY - collisionDepth.y > 0
              ? /**/ deltaX - collisionDepth.x /**/
              : deltaX - collisionDepth.x
            : deltaY - collisionDepth.y > 0
            ? deltaX
            : 0;
        testMovementVector1.y =
          deltaY - collisionDepth.y > 0
            ? deltaX - collisionDepth.x <= 0
              ? deltaY - collisionDepth.y
              : 0
            : deltaY;

        // Calculate test movement vector for y direction

        testMovementVector2.y =
          deltaY - collisionDepth.y > 0
            ? deltaX - collisionDepth.x > 0
              ? /**/ deltaY - collisionDepth.y /**/
              : deltaY - collisionDepth.y
            : deltaX - collisionDepth.x > 0
            ? deltaY
            : 0;
        testMovementVector2.x =
          deltaX - collisionDepth.x > 0
            ? deltaY - collisionDepth.y > 0
              ? deltaX
              : deltaX - collisionDepth.x
            : deltaX;
      } else if (deltaX > 0 && deltaY < 0) {
        // Calculate test movement vector for x direction

        testMovementVector1.x =
          deltaX - collisionDepth.x > 0
            ? deltaY - collisionDepth.y < 0
              ? /**/ deltaX - collisionDepth.x /**/
              : deltaX - collisionDepth.x
            : deltaY - collisionDepth.y < 0
            ? deltaX
            : 0;
        testMovementVector1.y =
          deltaY - collisionDepth.y < 0
            ? deltaX - collisionDepth.x <= 0
              ? deltaY - collisionDepth.y
              : 0
            : deltaY;

        // Calculate test movement vector for y direction

        testMovementVector2.y =
          deltaY - collisionDepth.y < 0
            ? deltaX - collisionDepth.x > 0
              ? /**/ deltaY - collisionDepth.y /**/
              : deltaY - collisionDepth.y
            : deltaX - collisionDepth.x > 0
            ? deltaY
            : 0;
        testMovementVector2.x =
          deltaX - collisionDepth.x > 0
            ? deltaY - collisionDepth.y < 0
              ? deltaX
              : deltaX - collisionDepth.x
            : deltaX;
      } else if (deltaX < 0 && deltaY > 0) {
        // Calculate test movement vector for x direction

        testMovementVector1.x =
          deltaX - collisionDepth.x < 0
            ? deltaY - collisionDepth.y > 0
              ? /**/ deltaX - collisionDepth.x /**/
              : deltaX - collisionDepth.x
            : deltaY - collisionDepth.y > 0
            ? deltaX
            : 0;
        testMovementVector1.y =
          deltaY - collisionDepth.y > 0
            ? deltaX - collisionDepth.x >= 0
              ? deltaY - collisionDepth.y
              : 0
            : deltaY;

        // Calculate test movement vector for y direction

        testMovementVector2.y =
          deltaY - collisionDepth.y > 0
            ? deltaX - collisionDepth.x < 0
              ? /**/ deltaY - collisionDepth.y /**/
              : deltaY - collisionDepth.y
            : deltaX - collisionDepth.x < 0
            ? deltaY
            : 0;
        testMovementVector2.x =
          deltaX - collisionDepth.x < 0
            ? deltaY - collisionDepth.y > 0
              ? deltaX
              : deltaX - collisionDepth.x
            : deltaX;
      } else if (deltaX < 0 && deltaY < 0) {
        // Calculate test movement vector for x direction

        testMovementVector1.x =
          deltaX - collisionDepth.x < 0
            ? deltaY - collisionDepth.y < 0
              ? /**/ deltaX - collisionDepth.x /**/
              : deltaX - collisionDepth.x
            : deltaY - collisionDepth.y < 0
            ? deltaX
            : 0;
        testMovementVector1.y =
          deltaY - collisionDepth.y < 0
            ? deltaX - collisionDepth.x >= 0
              ? deltaY - collisionDepth.y
              : 0
            : deltaY;

        // Calculate test movement vector for y direction

        testMovementVector2.y =
          deltaY - collisionDepth.y < 0
            ? deltaX - collisionDepth.x < 0
              ? /**/ deltaY - collisionDepth.y /**/
              : deltaY - collisionDepth.y
            : deltaX - collisionDepth.x < 0
            ? deltaY
            : 0;
        testMovementVector2.x =
          deltaX - collisionDepth.x < 0
            ? deltaY - collisionDepth.y < 0
              ? deltaX
              : deltaX - collisionDepth.x
            : deltaX;
      }
    }

    // console.log(movingObject.position.x + testMovementVector1.x ,movingObject.position.y + testMovementVector1.y , stationaryObject.position.x , stationaryObject.position.y);

    let finalMovement: /* false | */ Position = /* false */ testMovementVector2;

    if (
      movingObject.position.x + testMovementVector1.x <=
        stationaryObject.position.x + stationaryObject.dimentions.width &&
      movingObject.position.x +
        testMovementVector1.x +
        movingObject.dimentions.width >=
        stationaryObject.position.x &&
      movingObject.position.y + testMovementVector1.y <=
        stationaryObject.position.y + stationaryObject.dimentions.height &&
      movingObject.position.y +
        testMovementVector1.y +
        movingObject.dimentions.height >=
        stationaryObject.position.y
    ) {
      // console.log("test 1");
      finalMovement = testMovementVector1;
    } else if (
      stationaryObject.position.x + testMovementVector2.x <=
        stationaryObject.position.x + stationaryObject.dimentions.width &&
      stationaryObject.position.x +
        testMovementVector2.x +
        movingObject.dimentions.width >=
        stationaryObject.position.x &&
      stationaryObject.position.y + testMovementVector2.y <=
        stationaryObject.position.y + stationaryObject.dimentions.height &&
      stationaryObject.position.y +
        testMovementVector2.y +
        movingObject.dimentions.height >=
        stationaryObject.position.y
    ) {
      // console.log("test 2");
      finalMovement = testMovementVector2;
    }

    // Adjust the position of the moving object based on the finalMovement vector

    const n = 0.01;

    if (
      testMovementVector1.x !== movingObject.targetPosition.x ||
      testMovementVector1.y !== movingObject.targetPosition.y
    ) {
      collision = true;
    }

    if (collision) {
      return {
        position: {
          x:
            movingObject.position.x +
            (deltaX > 0
              ? finalMovement.x - n
              : deltaX < 0
              ? finalMovement.x + n
              : 0),
          y:
            movingObject.position.y +
            (deltaY > 0
              ? finalMovement.y - n
              : deltaY < 0
              ? finalMovement.y + n
              : 0),
        },
        collision,
      };
    } else {
      return { position: movingObject.targetPosition, collision };
    }
  } else {
    return { position: movingObject.targetPosition, collision };
  }
}
