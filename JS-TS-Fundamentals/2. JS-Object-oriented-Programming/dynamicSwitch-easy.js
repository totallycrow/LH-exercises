class Switch {
  _conditions = [];

  add(condition, callback) {
    CallbackValidator.validateType(callback);

    const conditionObject = {
      condition: condition,
      callback: callback,
    };

    this.conditions.push(conditionObject);
  }

  reset() {
    this.conditions = []
  }

  checkValidity() {
    const clonedConditions = [...this.conditions];
    const isValid = clonedConditions.every((el) => {
      if (el.condition === false) {
        return true;
      }
      el.callback();
      return false;
    });
    this.reset()
    return isValid
  }

  isEmpty() {
    return this.conditions.length === 0;
  }
}

// Utilities

// animal.age
// cat <---


// if (czy kot.age jest animalem) -> true

class TypeValidator {
 static validateFunction(fn, msg) {
    if (typeof fn !== "function") {
      throw new Error(msg);
    }
    return true;
  }

  static validateBoolean(bool, msg) {
    if (typeof bool !== "function") {
      throw new Error(msg);
    }
    return true;
  }

  static validateBoolean(bool, msg) {
    if (typeof bool !== "function") {
      throw new Error(msg);
    }
    return true;
  }
}

const ArrayUtility = {
  cleanArray() {
    return [];
  },
};

// ******************
// ma to działać tak:
const formChecker = new Switch();
const value = "test";

formChecker.add(value.length < 5, () => {
  console.error("value is too short");
});

formChecker.add(!value.includes("@"), () => {
  console.error("value is not an email");
});

formChecker.isValid(); // === false
// console.error('value is to short')
// console.error('value is not an email')
// formChecker.isEmpty() === true

console.log(formChecker.conditions);

// CHECK IF CLEANED

//   ****** GOALS
// Stwórz klasę Switch, która służy do wielokrotnej, równorzędnej walidacji
// Klasa ma mieć metode .add w której dodajemy warunek do sprawdzenia oraz callback, który ma się wywołać jeśli warunek zostanie spełniony
// Klasa ma mieć metodę .isValid która iteruje po wszystkich cases sprawdzając każdy dodany wcześniej warunek
// Klasa ma mieć metodę .isEmpty która sprawdza czy tablice cases i conditions są puste. Jeśli tak zwraca true
// Metoda .isValid zwraca true jeśli wszystkie warunki będą na false. Jeżeli jakikolwiek warunek zostanie spełniony, funkcja przerywa swoje działanie, wywołując przekazany callback dla tego warunku. Po każdym wykonaniu metody warunki i callbacki są czyszczone.