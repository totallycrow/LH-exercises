"use strict";
// Twoim zadaniem jest odtworzyć efekt wizualny pisania, na podstawie biblioteki: https://mattboldt.com/demos/typed-js/
// Instancja klasy Typed:
// ma pozwalać na wskazanie elementu html, w którym aktualny tekst zawarty w elemencie zostanie zdobiony tym elementem.
// ma tworzyć za wskazanym elementem, mrugająca, pionową linię symulującą kursor,
// ma pozwalać na wsazanie czy pisane mają być wyrazy czy litery,
// ma pozwalać na wskazanie tempa pisania w ilościach liter na minutę (defaultowo 120/min)
// *************************************
// ************* UTILITIES *************
// *************************************
const mockOptions = {
    typeStyle: "letters",
    strings: ["Lorem", "Ipsum"],
    typeSpeed: 100,
    removeAfter: false,
};
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
// *************************************
// ************* CONTROLLER ************
// *************************************
class TypingController {
    constructor(elem, options) {
        const targetHtmlElement = document.querySelector(elem);
        const typeWriter = new TypeWriter(targetHtmlElement);
        const typeSpeed = options.typeSpeed;
        const removeAfter = options.removeAfter;
        let itemsToType = [];
        if (options.typeStyle === "letters") {
            itemsToType = options.strings.join(" ").split("");
        }
        else {
            itemsToType = options.strings.map((el) => el + " ");
        }
        console.log(itemsToType);
        typeWriter.typeElements(itemsToType, typeSpeed, removeAfter);
    }
}
// *************************************
// ************* TYPE EFFECT ***********
// *************************************
class TypeWriter {
    cursor;
    cursorArea;
    elementToTypeTo;
    givenElement;
    constructor(elem) {
        this.cursor = new Cursor();
        this.cursorArea = document.createElement("span");
        this.elementToTypeTo = document.createElement("span");
        this.givenElement = elem;
    }
    setTypeContainer = () => {
        this.cursor.setCursor(this.cursorArea, 200);
        this.givenElement.appendChild(this.elementToTypeTo);
        this.givenElement.appendChild(this.cursorArea);
    };
    typeElements = (array, typeSpeed, remove) => {
        this.setTypeContainer();
        this.typer(array, this.elementToTypeTo, typeSpeed, remove);
    };
    typer = (elementToTypeOut, elementToWriteTo, typeSpeed, remove) => {
        let i = 0;
        const type = () => {
            setTimeout(() => {
                if (i == elementToTypeOut.length && remove) {
                    this.remover(elementToTypeOut, elementToWriteTo, typeSpeed);
                }
                if (i == elementToTypeOut.length) {
                    return;
                }
                if (i < elementToTypeOut.length) {
                    elementToWriteTo.innerHTML =
                        elementToWriteTo.innerHTML + elementToTypeOut[i];
                    console.log(elementToTypeOut[i]);
                    i++;
                    setTimeout(type, typeSpeed);
                }
            }, typeSpeed);
        };
        type();
    };
    remover = (elementToTypeOut, elementToWriteTo, typeSpeed) => {
        let i = 0;
        console.log(elementToTypeOut);
        let toType = elementToTypeOut;
        setTimeout(() => {
            const type = () => {
                if (i == elementToTypeOut.length) {
                    return;
                }
                if (i < elementToTypeOut.length) {
                    toType = toType.slice(0, -1);
                    console.log(toType);
                    elementToWriteTo.innerHTML = toType.join("");
                    i++;
                    setTimeout(type, typeSpeed);
                }
            };
            type();
        }, 1000);
    };
}
