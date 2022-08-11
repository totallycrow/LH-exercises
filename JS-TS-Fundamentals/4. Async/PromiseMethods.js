"use strict";
// Wypracuj funkcje, które odwzorowują działanie metod promisowych + według mnie promisy powinny posiadać jeszczę dwie dodatkowe metody(Wszystko opisane dokładniej poniżej w kodzie)
// Wypracowanie funkcji promise.all(arrayOfPromises)
// Wypracowanie funkcji promise.race(arrayOfPromises)
// Wypracowanie funkcji promise.last(arrayOfPromise)
// Wypracowanie funkcji promise.ignoreErrors(arrayOfPromise)
// Wykonaj zadanie przy pomocy operatorów async/await i bez nich
// ********** PROMISE ALL **********
// PROMISES
const promiseAll = (arrayOfPromise) => {
    return new Promise((resolve, reject) => {
        let result = [];
        let counter = 0;
        arrayOfPromise.forEach((el, index) => {
            el.then((res) => {
                counter++;
                result[index] = res;
                if (counter === arrayOfPromise.length) {
                    resolve(result);
                }
            }).catch((err) => reject(err));
        });
    });
};
async function testfunc() {
    const test = await promiseAll(array);
    console.log(test);
    return test;
}
testfunc();
// ****************************************
// ASYNC/AWAIT
async function asyncPromiseAll(arrayOfPromise) {
    return new Promise((resolve, reject) => {
        let result = [];
        arrayOfPromise.forEach(async function (el) {
            try {
                const res = await el;
                result.push(res);
            }
            catch (err) {
                reject(err);
            }
        });
        resolve(result);
    });
}
async function testfuncAsync() {
    const test = await asyncPromiseAll(array);
    console.log(test);
    return test;
}
testfunc();
// ****************************************
// ********** PROMISE RACE **********
const promiseRace = (arrayOfPromise) => {
    return new Promise((resolve, reject) => {
        // ...
        let counter = 0;
        arrayOfPromise.forEach((el, index) => {
            el.then((res) => {
                if (counter === 0) {
                    counter++;
                    resolve(res);
                    return;
                }
            }).catch((err) => {
                if (counter === 0)
                    counter++;
                reject(err);
                return;
            });
            return;
        });
    });
};
async function testfRace() {
    const test = await promiseRace(array);
    console.log(test);
    return test;
}
testfRace();
// ****************************************
const promiseLast = (arrayOfPromise) => {
    return new Promise((resolve, reject) => {
        // ...
        let result = [];
        let error = [];
        arrayOfPromise.forEach((el, index) => {
            el.then((res) => {
                result.push(res);
                if (result.length === arrayOfPromise.length) {
                    resolve(res);
                    return;
                }
            }).catch((err) => {
                error.push(err);
                if (result.length === arrayOfPromise.length) {
                    reject(err);
                    return;
                }
            });
        });
    });
};
async function testfLast() {
    const test = await promiseLast(array);
    console.log(test);
    return test;
}
testfLast();
// ****************************************
// const promiseIgnoreErrors = (arrayOfPromise) => {
//   return new Promise((resolve, reject) => {
//     // ...
//   });
// };
const promiseIgnoreErrors = (arrayOfPromise) => {
    return new Promise((resolve, reject) => {
        // ...
        let result = [];
        let counter = 0;
        arrayOfPromise.forEach((el, index) => {
            el.then((res) => {
                counter++;
                result[index] = res;
                if (counter === arrayOfPromise.length) {
                    resolve(result);
                }
            }).catch((err) => {
                counter++;
                if (counter === arrayOfPromise.length) {
                    resolve(result);
                }
            });
        });
    });
};
async function asyncPromiseIgnoreErrorsl(arrayOfPromise) {
    return new Promise((resolve, reject) => {
        let result = [];
        arrayOfPromise.forEach(async function (el, index) {
            await el
                .then((res) => {
                result.push(res);
            })
                .catch((err) => console.log(err));
        });
        resolve(result);
    });
}
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo1");
    }, 800);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo2");
    }, 600);
});
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo3");
    }, 900);
});
const array = [p1, p3, p2];
// ****************************************
