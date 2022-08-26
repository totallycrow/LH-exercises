"use strict";
// *************************************
// ************* UTILITIES *************
// *************************************
const mockOptions = {
    typeStyle: "letters",
    strings: ["Lorem", "Ipsum"],
    typeSpeed: 100,
    removeAfter: false,
};
class UIController {
    cursor;
    givenElement;
    constructor(root) {
        this.cursor = new Cursor();
        this.givenElement = root;
    }
    setTypeContainer = () => {
        console.log(this.givenElement);
        const elementToTypeTo = document.createElement("span");
        const cursorArea = document.createElement("span");
        this.cursor.setCursor(cursorArea, 200);
        this.givenElement.appendChild(elementToTypeTo);
        this.givenElement.appendChild(cursorArea);
        return this;
    };
    getElementToTypeTo = () => {
        const elementToTypeTo = this.givenElement.firstChild;
        console.log(elementToTypeTo);
        return elementToTypeTo;
    };
}
class Cursor {
    setCursor = (element, typeSpeed) => {
        let visible = true;
        const cursor = document.createElement("span");
        cursor.innerText = "|";
        cursor.style.cssText = "display: inline-block;";
        setInterval(() => {
            if (visible) {
                cursor.style.cssText = "display: none";
                visible = !visible;
                // return cursor;
            }
            else {
                cursor.style.cssText = "display: inline-block; margin-left: 5px;";
                visible = !visible;
                // return cursor;
            }
        }, typeSpeed);
        element.appendChild(cursor);
    };
}
class Clock {
    callback;
    interval;
    constructor(callback, interval) {
        this.callback = callback;
        this.interval = interval;
    }
    run = () => setInterval(this.callback, this.interval);
}
// *************************************
// ************* CONTROLLER ************
// *************************************
class TypingController {
    constructor(elem, options) {
        const targetHtmlElement = document.querySelector(elem);
        const ui = new UIController(targetHtmlElement);
        const typeSpeed = options.typeSpeed;
        ui.setTypeContainer();
        const root = ui.getElementToTypeTo();
        if (!root)
            throw new Error("Invalid element");
        console.log("TYPINGCONTROLLER START");
        let itemsToType = [];
        if (options.typeStyle === "letters") {
            itemsToType = options.strings.join(" ").split("");
        }
        else {
            itemsToType = options.strings.map((el) => el + " ");
        }
        console.log(itemsToType);
        console.log(root);
        const typer = new TypeWriter(itemsToType, root, typeSpeed);
        // typeWriter.typeElements(itemsToType, typeSpeed, removeAfter);
        typer.start();
    }
}
// *************************************
// ************* TYPE EFFECT ***********
// *************************************
class TypeWriter {
    index;
    typeForward;
    givenArray;
    toType;
    clock;
    root;
    constructor(array, root, typeSpeed) {
        this.index = 0;
        this.typeForward = true;
        this.toType = [];
        this.givenArray = array;
        this.clock = new Clock(this.type, typeSpeed);
        this.root = root;
    }
    start = () => this.clock.run();
    type = () => {
        const targetHtmlElement = this.root;
        const maxIndex = this.givenArray.length;
        if (!targetHtmlElement)
            throw new Error("Error");
        if (this.index == maxIndex && this.typeForward === true) {
            this.typeForward = !this.typeForward;
            return;
        }
        if (this.index < maxIndex && this.typeForward === true) {
            this.toType.push(this.givenArray[this.index]);
            targetHtmlElement.innerHTML = this.toType.join("");
            this.index++;
            return;
        }
        if (this.index >= 0 && this.typeForward === false) {
            targetHtmlElement.innerHTML = this.givenArray
                .slice(0, this.index)
                .join("");
            this.index--;
            return;
        }
    };
}
// NOTES
// Intersection observer // w js
// Observer Pattern / pub sub /// RX
// .subscribe(callback) <-- to dostaje ui
// this.subcribers.push(subscriber)
// .emmit() na scroll + poczytaj jak zrobić scrolla z performance, eventlistener passive: true
// this.subcribers.foreach(subscriber => {
//   subscriber.callback(this.data)
// })
// const typer = new Typer(".element")
// typer.buildUI()
// typer.start()
// typer.stop()
// Logic
// UI <-- Clock
// UI <-- TypeWritter
// genrateCurrentString
// this.currentString = this.givenString.slice(0, this.currentIndex)
// setInvertal(cb, 1000)
// cb ->
// this.direction = boolean
// if (this.index === length && this.direction) {
//   this.direction = !this.direction
// }
// if (this.direction) {
//   type()
// this.currentIndex++
// } else {
//   remove()
// this.currentIndex--
// }
