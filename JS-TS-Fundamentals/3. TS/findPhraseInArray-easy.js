"use strict";
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
const findPhraseInArray = (array, phrase) => {
    if (array.length === 0) {
        throw new Error("Empty array provided");
    }
    const clonedArray = array.slice(0);
    let foundIndex = -1;
    const result = clonedArray.some((el, index) => {
        if (el.toLowerCase() === phrase.toLowerCase()) {
            foundIndex = index;
            return true;
        }
        else
            return false;
    });
    if (result) {
        return [foundIndex, clonedArray[foundIndex]];
    }
    return "Not found";
};
// przykładowe działanie:
const result = findPhraseInArray(inputData, "tut");
// result === [ [2, 'tutaj'], [5, 'TUTAJ'] ]
const test1 = findPhraseInArray(inputData, "ZZZZ");
const test2 = findPhraseInArray(inputData, "stwó");
const test3 = findPhraseInArray(inputData, "n");
const test4 = findPhraseInArray(inputData, "NODEJS");
// const test5 = findPhraseInArray([], "NODEJS");
console.log(result);
console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);
