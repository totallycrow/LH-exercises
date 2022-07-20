const aggregateIntoChunks = (array) => {
  const MINLENGTH = 4;
  const MAXLENGTH = 7;

  if (!Array.isArray(array)) {
    throw new Error("Input must be a valid array");
  }

  if (array.length <= MINLENGTH) {
    return array;
  }

  return aggregateItems(array, MINLENGTH, MAXLENGTH);
};

// ************** HELPER FUNCTIONS ********************

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function aggregateItems(array, min, max) {
  const clonedArray = [...array];
  const originalArrayLength = [...array].length;
  let currentArrayLength = [...array].length;

  let result = [];

  let i = 0;
  while (i < originalArrayLength) {
    const randomNum = getRandom(min, max + 1);
    let lengthDifference = currentArrayLength - randomNum;

    if (lengthDifference >= min || lengthDifference === 0) {
      const chunk = clonedArray.slice(i, i + randomNum);
      result.push(chunk);
      currentArrayLength -= randomNum;
      i += randomNum;
    }
  }
  return result;
}

// ********** TESTING ***************

console.log("************ TESTING RESULTS ****************");
console.log("************ TESTING RESULTS ****************");
console.log("************ TESTING RESULTS ****************");

const alphabet = "abcdefghijklmnoprstuwxyz".split("");
// const alphabet = "abcd".split("");

const chunks = aggregateIntoChunks(alphabet);
const chunksNums = aggregateIntoChunks([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const chunksEmpty = aggregateIntoChunks([]);

// chunks:
// [[a,b,c,d,e,f],[g,h,i,j,k],[l,m,n,o,p,r,s],[t,u,w,x,y,z]]

console.log("FINAL CHUNKS VAR");
console.log(chunks);
console.log(chunksNums);
console.log(chunksEmpty);

// FINAL CHECKS

console.log(chunks.every((el) => el.length >= 4 || el.length <= 7));
console.log(chunksNums.every((el) => el.length >= 4 || el.length <= 7));

// ERROR TEST
// const chunksError = aggregateIntoChunks("test");
