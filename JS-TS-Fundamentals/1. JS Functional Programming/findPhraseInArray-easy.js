const inputData = ["stwórz", "sobie", "tutaj", "więcej", "wyrazów", "TUTAJ", "first", "second", "boris-johnson", "macOS", "windows", "Cloud", "AWS", "mongoDB", "nodeJS"];

const findPhraseInArray = (array, phrase) => {
  let results = [];

  array.forEach( (item, index) => {    
    if(item.toLowerCase().includes(phrase)) {        
        results.push([index, item]);
    }
    });

    if (results.length > 0) {
        return results
    } else return 'Phrase not found in the array.'
}

// przykładowe działanie:
const result = findPhraseInArray(inputData, "tut");
// result === [ [2, 'tutaj'], [5, 'TUTAJ'] ]
const test1 = findPhraseInArray(inputData, "ZZZZ")
const test2 = findPhraseInArray(inputData, "stwó")
const test3 = findPhraseInArray(inputData, "n")
const test4 = findPhraseInArray(inputData, "NODEJS")

console.log(result);
console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);