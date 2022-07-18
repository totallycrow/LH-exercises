// **************** FOREACH *******************
const forEachFn = (array, callback) => {
  //   // VALIDATION
  validateCallback(callback);
  validateArray(array)

  const clonedArray = [...array];
  const arrayLength = clonedArray.length;

  for (let i = 0; i < arrayLength; i++) {
    callback(clonedArray[i]);
  }
};

// ****************** MAP *****************
const mapFn = (array, callback) => {
  //   // VALIDATION
  validateCallback(callback);
  validateArray(array)


  const clonedArray = [...array];
  const arrayLength = clonedArray.length;
  let mappedArray = [];

  for (let i = 0; i < arrayLength; i++) {
    const output = clonedArray(array[i])

    if (output === undefined) throw

    mappedArray.push(output);
  }
  return mappedArray;
};

// **************** ENTRIES ****************
const entriesFn = (array) => {
  validateArray(array, "returned false")

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
  validateCallback(callback);
  validateArray(array);

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

  validateCallback(callback);

  if (!validateArray(array) && initialValueType === "[object Undefined]") {
    console.log("returned false");
    throw new TypeError("Reduce of empty array with no initial value");
  }
  if (!validateArray(array)) {
    return initial;
  }

  const clonedArray = [...array];
  const arrayLength = clonedArray.length;

  const isInitialValue = initial === undefined

  let result = isInitialValue ? initial : clonedArray[0];
  if (isInitialValue) clonedArray.unshift(initial)

  for (i; i < arrayLength; i++) {
    // callback(result, clonedArray[i]) === undefined

    result = callback(result, clonedArray[i]);
  }

  // console.log("RESULT");
  // console.log(result);
  return result;
};

// ****************** EVERY *****************
const everyFn = (array, callback) => {
  validateCallback(callback);

  if (!validateArray(array)) {
    console.log("returned false");
    return;
  }

  const clonedArray = [...array];
  const arrayLength = clonedArray.length;

  for (let i = 0; i < arrayLength; i++) {
    if (!callback(clonedArray[i])) {
      return false;
    }
    return true;
  }
};

// ****************** SOME *****************
const someFn = (array, callback) => {
  validateCallback(callback);

  if (!validateArray(array)) {
    console.log("returned false");
    return;
  }

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
// HELPER FUNCTIONS
// ***********************************

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

// ***********************************
// *************** TESTING *******************
// ***********************************

const testArray = [1, 2, 3, 4, 5];

const test = forEachFn([1, 2, 3, 4], "test");
console.log(test);


// forEachFn(testArray, (el) => {
//   console.log(el);
// });

// filterFn(testArray, (el) => el === 1 || el === 4);

// console.log(mapFn(testArray, (el) => el * 2));

// console.log(entriesFn(testArray));

// console.log("RECREATED REDUCE:");
// console.log(reduceFn(testArray, (acc, el) => acc + el));
// console.log(testArray.reduce((acc, el) => acc + el));

// console.log(everyFn(testArray, (el) => el > 0));
// console.log(someFn(testArray, (el) => el > 1));

// ***********************************
