// Stwórz funkcję tworzącą promisę o nazwie recursivePromise(arrayOfPromises), którą przyjmuję jako argument listę z promisami.
// Na potrzeby zadania zakładamy, że każdy z elementów arrayOfPromises jest promisem i elementów w arrayOfPromises jest minimum 7.
// Promisy z listy mają się wywoływać kolejna po zakończeniu poprzedniej, a ostatnia w .then ma zwrócić listę ze wszystkimi wynikami promis z arrayOfPromises zachowując odpowiednią kolejność.
// Jeśli wystąpi błąd w którejkolwiek promisie ma on zostać zwrócony do .catch wraz z poprzednimi wynikami z promis niewykonując kolejnych
// Wykonaj zadanie przy pomocy operatorów async/await i bez nich

// ******************************************
// ******************************************
// ******************************************

const pp1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo1");
  }, 100);
});

const pp2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo2");
  }, 200);
});

const pp3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("foo3");
  }, 300);
});

const array2 = [pp2, pp3, pp1];

// @ts-ignore
type TArrayOfPromises<T> = Array<Promise<T>>;

// ******************************************
// ******************************************
// ******************************************

async function ArecursivePromise<T>(arrayOfPromises: TArrayOfPromises<T>) {
  let index = 0;
  let result: Array<T> = [];

  try {
    await asyncResolveAndAdd(index, array2, result);
    return result;
  } catch (err) {
    throw err;
  }
}

async function asyncResolveAndAdd<T>(
  index: number,
  arrayOfPromises: TArrayOfPromises<T>,
  result: Array<T>
) {
  if (index + 1 === arrayOfPromises.length) {
    return result;
  }

  try {
    await arrayOfPromises[index].then((res) => {
      result.push(res);
      index++;
      asyncResolveAndAdd(index, arrayOfPromises, result);
    });
  } catch (err) {
    result.push(err as T);
    return;
  }
}

async function testfunc(): Promise<any> {
  const test = await ArecursivePromise(array2);
  console.log(test);
  return test;
}
const test133 = testfunc();
console.log(test133);

// ssss
