"use strict";
// Wypracuj funkcje, które odwzorowują działanie metod promisowych + według mnie promisy powinny posiadać jeszczę dwie dodatkowe metody(Wszystko opisane dokładniej poniżej w kodzie)
// Wypracowanie funkcji promise.all(arrayOfPromises)
// Wypracowanie funkcji promise.race(arrayOfPromises)
// Wypracowanie funkcji promise.last(arrayOfPromise)
// Wypracowanie funkcji promise.ignoreErrors(arrayOfPromise)
// Wykonaj zadanie przy pomocy operatorów async/await i bez nich
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// ********** PROMISE ALL **********
// PROMISES
const promiseAll = (arrayOfPromise) => {
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
            }).catch((err) => reject(err));
        });
    });
};
function testfunc() {
    return __awaiter(this, void 0, void 0, function* () {
        const test = yield promiseAll(array);
        console.log(test);
        return test;
    });
}
testfunc();
// ****************************************
// ASYNC/AWAIT
function asyncPromiseAll(arrayOfPromise) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let result = [];
            arrayOfPromise.forEach(function (el) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield el
                        .then((res) => {
                        result.push(res);
                    })
                        .catch((err) => reject(err));
                });
            });
            resolve(result);
        });
    });
}
function testfuncAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        const test = yield asyncPromiseAll(array);
        console.log(test);
        return test;
    });
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
function testfRace() {
    return __awaiter(this, void 0, void 0, function* () {
        const test = yield promiseRace(array);
        console.log(test);
        return test;
    });
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
function testfLast() {
    return __awaiter(this, void 0, void 0, function* () {
        const test = yield promiseLast(array);
        console.log(test);
        return test;
    });
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
function asyncPromiseIgnoreErrorsl(arrayOfPromise) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let result = [];
            arrayOfPromise.forEach(function (el, index) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield el
                        .then((res) => {
                        result.push(res);
                    })
                        .catch((err) => console.log(err));
                });
            });
            resolve(result);
        });
    });
}
