// ***********************************
const forEachFn = (array, callback) => {
  //   // VALIDATION
  validateCallback(callback);
  if (!validateArray(array)) {
    console.log("returned false");
    return;
  }
  const arrayLength = array.length;

  for (let i = 0; i < arrayLength; i++) {
    callback(array[i]);
  }
};

// ***********************************
const mapFn = (array, callback) => {
  //   // VALIDATION
  validateCallback(callback);
  if (!validateArray(array)) {
    console.log("returned false");
    return;
  }
  const arrayLength = array.length;
  let mappedArray = [];

  for (let i = 0; i < arrayLength; i++) {
    mappedArray.push(callback(array[i]));
  }
  return mappedArray;
};
// ***********************************
const entriesFn = (array) => {
  if (!validateArray(array)) {
    console.log("returned false");
    return;
  }
  const arrayLength = array.length;
  let entries = [];

  for (let i = 0; i < arrayLength; i++) {
    entries.push([i, array[i]]);
  }

  return entries;
};

// ***********************************
const filterFn = (array, callback) => {
  validateCallback(callback);
  if (!validateArray(array)) {
    console.log("returned false");
    return;
  }
  const arrayLength = array.length;
  let filteredArray = [];

  for (let i = 0; i < arrayLength; i++) {
    if (callback(array[i])) {
      filteredArray.push(array[i]);
    }
  }
  console.log(filteredArray);
  return filteredArray;
};
// ***********************************
const reduceFn = (array, callback, initial) => {
  //   // VALIDATION
  //   validateCallback(callback);
  //   if (!validateArray(array)) {
  //     console.log("returned false");
  //     return;
  //   }

  const arrayLength = array.length;
  const initialValueType = Object.prototype.toString.call(initial);

  let initialValue;
  if (initialValueType === "[object Undefined]") {
    initialValue = array[0];
  } else initialValue = inital;

  console.log(array);
  console.log(callback);
  console.log(initialValue);

  let result = initialValue;

  for (let i = 0; i < arrayLength; i++) {
    result = callback(array[i]);
  }

  console.log("RESULT");
  console.log(result);
  return result;
};
// ***********************************
const everyFn = (array, callback) => {};
// ***********************************
const someFn = (array, callback) => {};

// ***********************************
// HELPER FUNCTIONS

function validateArray(array) {
  const callingFunction = validateArray.caller.name;
  const paramType = Object.prototype.toString.call(array);

  if (paramType === "[object Undefined]") {
    throw new TypeError(
      `missing argument 0 when calling function ${callingFunction}`
    );
  }

  if (!Array.isArray(array)) {
    throw new TypeError(`${callingFunction} is not a function`);
  }

  if (array.length === 0) {
    console.log("empty array");
    return false;
  }
  return true;
}

function validateCallback(callback) {
  const callingFunction = validateCallback.caller.name;
  const callbackType = Object.prototype.toString.call(callback);

  if (callbackType === "[object Undefined]") {
    throw new TypeError(
      `missing argument 1 when calling function ${callingFunction}`
    );
  }

  if (!(callbackType === "[object Function]")) {
    throw new TypeError(`${callingFunction} is not a function`);
  }
}

// *************** TESTING *******************
const testArray = [1, 2, 3, 4];

// const test = forEachFn([1, 2, 3, 4], (element) => console.log(element));
// console.log(test);

// forEachFn(testArray, (el) => {
//   console.log(el);
// });

// filterFn(testArray, (el) => el === 1 || el === 4);

// console.log(mapFn(testArray, (el) => el * 2));

// console.log(entriesFn(testArray));

console.log(
  reduceFn(testArray, (acc, el) => {
    acc + el;
  })
);
