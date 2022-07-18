const alphabet = "abcdefghijklmnoprstuwxyz".split("");

const aggregateIntoChunks = (array) => {
  console.log("start")
  console.log(array)
  // return ...
  const MINLENGTH = 4;
  const MAXLENGTH = 7;

  let arrayLength = array.length

  



  console.log(arrayLength)




};

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const chunks = aggregateIntoChunks(alphabet);

// chunks:
// [[a,b,c,d,e,f],[g,h,i,j,k],[l,m,n,o,p,r,s],[t,u,w,x,y,z]]

// ********** TEST ***************
console.log(chunks)