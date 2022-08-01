"use strict";
// **************** FOREACH *******************
const forEachFn = (array, callback) => {
  const clonedArray = [...array];
  const arrayLength = clonedArray.length;
  for (let i = 0; i < arrayLength; i++) {
    callback(clonedArray[i]);
  }
};
// function getLength<T>(arg: Array<T>) {}
// ****************** MAP *****************
// const mapFn = (array: validArray, callback: Function) => {
function mapFn(array, callback) {
  const clonedArray = [...array];
  const arrayLength = clonedArray.length;
  let mappedArray = [];
  for (let i = 0; i < arrayLength; i++) {
    const output = callback(clonedArray[i]);
    mappedArray.push(output);
  }
  return mappedArray;
}
// **************** ENTRIES ****************
const entriesFn = (array) => {
  const clonedArray = [...array];
  const arrayLength = clonedArray.length;
  let entries = [];
  for (let i = 0; i < arrayLength; i++) {
    entries.push([i, clonedArray[i]]);
  }
  return entries;
};
// ***************** FILTER **************
const filterFn = (array, callback) => {
  const clonedArray = [...array];
  const arrayLength = clonedArray.length;
  let filteredArray = [];
  for (let i = 0; i < arrayLength; i++) {
    // if (clonedArray[i] === undefined)
    if (callback(clonedArray[i])) {
      filteredArray.push(clonedArray[i]);
    }
  }
  return filteredArray;
};
// ****************** REDUCE ************
const reduceFn = (array, callback, initial) => {
  //   // VALIDATION
  const initialValueType = Object.prototype.toString.call(initial);
  if (array.length === 0 && initialValueType === "[object Undefined]") {
    console.log("returned false");
    throw new TypeError("Reduce of empty array with no initial value");
  }
  const clonedArray = [...array];
  const arrayLength = clonedArray.length;
  const isInitialValue = initial === undefined;
  let result = isInitialValue ? initial : clonedArray[0];
  if (isInitialValue) clonedArray.unshift(initial);
  for (let i = 0; i < arrayLength; i++) {
    // callback(result, clonedArray[i]) === undefined
    result = callback(result, clonedArray[i]);
  }
  // console.log("RESULT");
  // console.log(result);
  return result;
};
// ****************** EVERY *****************
const everyFn = (array, callback) => {
  const clonedArray = [...array];
  const arrayLength = clonedArray.length;
  for (let i = 0; i < arrayLength; i++) {
    if (!callback(clonedArray[i])) {
      return false;
    }
  }
  return true;
};
// ****************** SOME *****************
const someFn = (array, callback) => {
  const clonedArray = [...array];
  const arrayLength = clonedArray.length;
  for (let i = 0; i < arrayLength; i++) {
    console.log(array[i]);
    if (callback(clonedArray[i])) {
      console.log(callback(clonedArray[i]));
      return true;
    }
  }
  return false;
};
// ***********************************
// *************** TESTING *******************
// ***********************************
const testArray = [1, 2, 3, 4, 5];
// const test = forEachFn([1, 2, 3, 4], "test");
// console.log(test);
// forEachFn(testArray, (el) => {
//   console.log(el);
// });
// filterFn(testArray, (el) => el === 1 || el === 4);
console.log(mapFn(testArray, (el) => el * 2));
// console.log(entriesFn(testArray));
// console.log("RECREATED REDUCE:");
// console.log(reduceFn(testArray, (acc, el) => acc + el));
// console.log(testArray.reduce((acc, el) => acc + el));
// console.log(everyFn(testArray, (el) => el > 0));
// console.log(someFn(testArray, (el) => el > 1));
// ***********************************
