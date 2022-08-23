// Twoim zadaniem jest odtworzyć efekt wizualny pisania, na podstawie biblioteki: https://mattboldt.com/demos/typed-js/
// Instancja klasy Typed:

// ma pozwalać na wskazanie elementu html, w którym aktualny tekst zawarty w elemencie zostanie zdobiony tym elementem.
// ma tworzyć za wskazanym elementem, mrugająca, pionową linię symulującą kursor,
// ma pozwalać na wsazanie czy pisane mają być wyrazy czy litery,
// ma pozwalać na wskazanie tempa pisania w ilościach liter na minutę (defaultowo 120/min)

interface IOptions {
  typeStyle: "words" | "letters";
  strings: Array<string>;
  typeSpeed: number;
}

class Cursor {
  setCursor = (element: HTMLElement, typeSpeed: number) => {
    let visible = true;
    const cursor = document.createElement("span");
    cursor.innerText = "|";
    // cursor.style.cssText = "display: inline-block; margin-left: 2px;";
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
    }, typeSpeed);
    element.appendChild(cursor);
  };
}

class Typed {
  constructor(elem: string, options: IOptions) {
    const test = document.querySelector(elem) as HTMLElement;
    console.log(test);

    // const cursor = new Cursor();
    // cursor.setCursor(test);

    this.setTyping(test);
  }

  // setCursor = (element: HTMLElement) => {
  //   let visible = true;
  //   const cursor = document.createElement("span");
  //   cursor.innerText = "|";
  //   cursor.style.cssText = "display: inline-block; margin-left: 8px;";

  //   setInterval(() => {
  //     if (visible) {
  //       cursor.style.cssText = "display: none";
  //       visible = !visible;
  //       return cursor;
  //     } else {
  //       cursor.style.cssText = "display: inline-block; margin-left: 8px;";
  //       visible = !visible;
  //       return cursor;
  //     }
  //   }, 500);
  //   element.appendChild(cursor);
  // };

  setTyping = (element: HTMLElement, array: Array<string>) => {
    let a = ["Lorem"];

    const cursor = new Cursor();

    const staticCursor = document.createElement("span");
    // staticCursor.style.cssText =
    //   "display: inline-block; margin-left: 8px; width: 2px; height: 42px; background-color: red;";

    const typeElement = document.createElement("span");

    cursor.setCursor(staticCursor, 500);
    element.appendChild(typeElement);
    element.appendChild(staticCursor);

    // staticCursor.innerHTML = "|";

    // element.insertAdjacentElement("afterend", staticCursor);

    // INF SINGLE WORDS
    let arr = a.join(" ");

    let time = 500;
    let i = 0;

    const writer = () => {
      if (i == arr.length) {
        return;
      }
      if (i < arr.length) {
        typeElement.innerHTML = typeElement.innerHTML + arr[i];
        i++;

        setTimeout(writer, time);
      }
    };
    writer();
  };
}

// class TypingCursor {}

// const test = document.querySelector(".main-div") as HTMLElement;
// console.log(test);
// test.style.height = "200px";
// test.style.backgroundColor = "#f2f2f2";

// const li = document.createElement("p");
// li.textContent = "test2";

// test.appendChild(li);
