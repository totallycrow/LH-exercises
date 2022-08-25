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

interface IOptions {
  typeStyle: "words" | "letters";
  strings: Array<string>;
  typeSpeed: number;
  removeAfter: boolean;
}

class Cursor {
  setCursor = (element: HTMLElement, typeSpeed: number) => {
    let visible = true;
    const cursor = document.createElement("span");
    cursor.innerText = "|";
    cursor.style.cssText = "display: inline-block;";

    setInterval(() => {
      if (visible) {
        cursor.style.cssText = "display: none";
        visible = !visible;
        // return cursor;
      } else {
        cursor.style.cssText = "display: inline-block; margin-left: 5px;";
        visible = !visible;
        // return cursor;
      }
    }, typeSpeed / 2);
    element.appendChild(cursor);
  };
}

// *************************************
// ************* CONTROLLER ************
// *************************************

class TypingController {
  constructor(elem: string, options: IOptions) {
    const targetHtmlElement = document.querySelector(elem) as HTMLElement;
    const typeWriter = new TypeWriter(targetHtmlElement);
    const typeSpeed = options.typeSpeed;
    const removeAfter = options.removeAfter;

    let itemsToType = [];

    if (options.typeStyle === "letters") {
      itemsToType = options.strings.join(" ").split("");
    } else {
      itemsToType = options.strings.map((el) => el + " ");
    }
    console.log(itemsToType);
    typeWriter.typeElements(itemsToType, typeSpeed, removeAfter);
  }
}

// *************************************
// ************* TYPE EFFECT ***********
// *************************************


// Intersection observer // w js

// Observer Pattern / pub sub /// RX
// .subscribe(callback) <-- to dostaje ui
    // this.subcribers.push(subscriber)

// .emmit() na scroll + poczytaj jak zrobić scrolla z performance, eventlistener passive: true
    // this.subcribers.foreach(subscriber => {
    //   subscriber.callback(this.data)
    // })


class TypeWriter {
  cursor: Cursor;
  cursorArea: HTMLElement;
  elementToTypeTo: HTMLElement;
  givenElement: HTMLElement;
  constructor(root: HTMLElement) {
    this.cursor = new Cursor();
    this.cursorArea = document.createElement("span");
    this.elementToTypeTo = document.createElement("span");
    this.givenElement = root;
  }

  init() {
    this.ui.prepare() 
    this.clock.start()
  }

  setTypeContainer = () => {
    this.cursor.setCursor(this.cursorArea, 200);
    this.givenElement.appendChild(this.elementToTypeTo);
    this.givenElement.appendChild(this.cursorArea);
  };

  typeElements = (array: Array<string>, typeSpeed: number, remove: boolean) => {
    this.setTypeContainer();
    this.typer(array, this.elementToTypeTo, typeSpeed, remove);
  };

  typer = (
    elementToTypeOut: Array<string>,
    elementToWriteTo: HTMLElement,
    typeSpeed: number,
    remove: boolean
  ) => {
    let i = 0;

    const type = () => {
      // setInvertal
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
  remover = (
    elementToTypeOut: Array<string>,
    elementToWriteTo: HTMLElement,
    typeSpeed: number
  ) => {
    let i = 0;
    console.log(elementToTypeOut);
    let toType = elementToTypeOut as Array<string>;
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