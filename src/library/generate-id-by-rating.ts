import { MapCellContentTypes } from "../gameobjects/map";

export default function generateIDByRating(arr: MapCellContentTypes[]) {
  // const arr:string[] = ['' , '' , '' , ''] ;

  const iterDuration = arr.length;

  const results: number[] = [];

  for (let range = 0; range < iterDuration; range++) {
    for (let i = 0; i < 20; i++) {
      const result = Math.floor(Math.random() * (iterDuration - range));
      results.push(result);
    }
  }

  // console.log(results.sort());

  return results[Math.floor(Math.random() * results.length)];
}
