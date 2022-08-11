"use strict";
// Stwórz funkcję tworzącą promisę o nazwie recursivePromise(arrayOfPromises), którą przyjmuję jako argument listę z promisami.
// Na potrzeby zadania zakładamy, że każdy z elementów arrayOfPromises jest promisem i elementów w arrayOfPromises jest minimum 7.
// Promisy z listy mają się wywoływać kolejna po zakończeniu poprzedniej, a ostatnia w .then ma zwrócić listę ze wszystkimi wynikami promis z arrayOfPromises zachowując odpowiednią kolejność.
// Jeśli wystąpi błąd w którejkolwiek promisie ma on zostać zwrócony do .catch wraz z poprzednimi wynikami z promis niewykonując kolejnych
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
// ******************************************
// ******************************************
// ******************************************
const resolveAndAdd = (index, arrayOfPromises, result) => {
    return new Promise((resolve, reject) => {
        console.log("Start recursion index: ", index);
        console.log("result.length", result.length);
        console.log("array.length", arrayOfPromises.length);
        console.log("initial result", result);
        if (index === arrayOfPromises.length) {
            resolve(result);
            return;
        }
        const currentPromise = arrayOfPromises[index];
        console.log(currentPromise);
        currentPromise
            .then((res) => {
            console.log("Then fired");
            console.log(res);
            result.push(res);
            resolveAndAdd(index, arrayOfPromises, result);
        })
            .catch((err) => {
            reject({ error: err, successfulPromises: result });
        });
        index++;
    });
};
// ******************************************
function recursivePromise(arrayOfPromises) {
    return new Promise((resolve, reject) => {
        let index = 0;
        let result = [];
        console.log("Start main Func");
        // [UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "#<Object>".] {
        return resolveAndAdd(index, arrayOfPromises, result)
            .then(() => result)
            .catch(() => result);
    });
}
function testfunc() {
    return __awaiter(this, void 0, void 0, function* () {
        const test = yield recursivePromise(array2);
        console.log(test);
        return test;
    });
}
const test13 = testfunc();
console.log(test13);
// ******************************************
// ******************************************
// ******************************************
