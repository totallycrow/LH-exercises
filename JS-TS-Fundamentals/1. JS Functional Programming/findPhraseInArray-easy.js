const inputData = [
  "stwórz",
  "sobie",
  "tutaj",
  "więcej",
  "wyrazów",
  "TUTAJ",
  "first",
  "second",
  "boris-johnson",
  "macOS",
  "windows",
  "Cloud",
  "AWS",
  "mongoDB",
  "nodeJS",
];

// // immutability pricible

// // const arr = [1, 2, 3, 4];
// findPhraseInArray(arr, 1);

const findPhraseInArray = (array, phrase) => {
  // isArray array -> throw new Error
  // isString -> throw new Error

  // 1. typy
  // 2. logika
  // 3. wymagań biznesowych

  // VALIDATION
  const inputPhraseType = Object.prototype.toString.call(phrase);

  if (!Array.isArray(array) && inputPhraseType !== "[Object string]") {
    throw new Error("Incorrect input type");
  }

  if (array.length <= 0) {
    return [];
  }

  // FIND PHRASE
  let results = [];

  array.forEach((item, index) => {
    const isMatching = item.toLowerCase() === phrase.toLowerCase();

    if (isMatching) {
      results.push([index, item]);
    }
  });

  const isEmpty = results.length <= 0;
  if (!isEmpty) return results;

  return "Phrase not found in the array.";
};

// return array.filter(el=>{
//     return el.toLowerCase() === phrase
//   })

// przykładowe działanie:
const result = findPhraseInArray(inputData, "tut");
// result === [ [2, 'tutaj'], [5, 'TUTAJ'] ]
const test1 = findPhraseInArray(inputData, "ZZZZ");
const test2 = findPhraseInArray(inputData, "stwó");
const test3 = findPhraseInArray(inputData, "n");
const test4 = findPhraseInArray(inputData, "NODEJS");

console.log(result);
console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);
