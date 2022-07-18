const alphabet = "abcdefghijklmnoprstuwxyz".split("");
// const alphabet = "abcd".split("");

const aggregateIntoChunks = (array) => {
  const MINLENGTH = 4;
  const MAXLENGTH = 7;

  return splitArray(array, MINLENGTH, MAXLENGTH);
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function splitArray(array, min, max) {
  console.log("FUNCTION START");
  let arrayLength = [...array].length;
  const clonedArray = [...array];
  let result = [];

  if (array.length <= min) {
    return array;
  }

  let i = 0;
  while (i < array.length) {
    console.log("LOOP START");
    console.log("INDEX:");
    console.log(i);

    console.log(i < array.length);
    let randomChunk = getRandom(min, max + 1);
    let difference = arrayLength - randomChunk;
    console.log("RANDOM");
    console.log(randomChunk);
    console.log("ARRAY LENGTH");
    console.log(arrayLength);
    console.log("DIFFERENCE");
    console.log(difference);

    if (difference >= min || difference === 0) {
      console.log("CLONE ARRAY BEFORE SLICE");
      console.log(clonedArray);
      let push = clonedArray.slice(i, i + randomChunk);
      console.log("PUSH");
      console.log(push);
      console.log("CLONE ARRAY AFTER SLICE");
      console.log(clonedArray);

      result.push(push);
      arrayLength -= randomChunk;
      i += randomChunk;
    }
  }
  return result;
}

const chunks = aggregateIntoChunks(alphabet);
const chunksNums = aggregateIntoChunks([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 12, 1231, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1,
]);

// chunks:
// [[a,b,c,d,e,f],[g,h,i,j,k],[l,m,n,o,p,r,s],[t,u,w,x,y,z]]

// ********** TEST ***************
console.log("FINAL CHUNKS VAR");
console.log(chunks);
console.log(chunksNums);

// FINAL CHECKS

console.log(chunks.every((el) => el.length >= 4 || el.length <= 7));
console.log(chunksNums.every((el) => el.length >= 4 || el.length <= 7));
