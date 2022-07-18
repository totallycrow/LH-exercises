const alphabet = "abcdefghijklmnoprstuwxyz".split("");

const aggregateIntoChunks = (array) => {
  console.log("start");
  console.log(array);
  // return ...
  const MINLENGTH = 4;
  const MAXLENGTH = 7;

  const clonedArray = [...array];
  let arrayLength = clonedArray.length;

  
  let result = [];
  

  // while (arrayLength >= MINLENGTH && arrayLength ) {
  //   const randomChunk = getRandom(MINLENGTH, MAXLENGTH+1);
  //   console.log(randomChunk);
  //   let chunkArray = []

  //   for (let i = 0; i < randomChunk; i++){
      
  //     chunkArray.push(clonedArray[i])
  //     clonedArray.splice(i, 1);

  //   }
  //   arrayLength = arrayLength - randomChunk
  //   result.push(chunkArray)
  //   chunkArray = []
  // }

  // 
  // Check if arraylength > 7
  // generate random number
  // deduct from arraylength
  // check if arraylength > 4
  // if not, re-genarate








  
  return result
  console.log(arrayLength);
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function splitArray(array) {

  inputArrayLength = array.length
  isNextValid = true;

  while(isNextValid) {
    const randomChunk = getRandom(MINLENGTH, MAXLENGTH+1);
    lengthCheck = inputArrayLength - randomChunk

    
  }

 





}


const chunks = aggregateIntoChunks(alphabet);

// chunks:
// [[a,b,c,d,e,f],[g,h,i,j,k],[l,m,n,o,p,r,s],[t,u,w,x,y,z]]

// ********** TEST ***************
console.log(chunks);
