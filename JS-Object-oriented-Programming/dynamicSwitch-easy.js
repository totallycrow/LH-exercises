class Switch {
  //   cases = [];
  conditions = [];

  add(condition, callback) {
    const conditionObject = {
      condition: condition,
      callback: callback,
    };
    this.conditions.push(conditionObject);
  }
  isValid() {
    // return this.conditions
    const clonedConditions = [...this.conditions];

    return clonedConditions.every((el) => {
      if (el.condition === false) {
        this.conditions = ArrayUtility.cleanArray(this.conditions);
        return true;
      } else {
        el.callback();
        this.conditions = ArrayUtility.cleanArray(this.conditions);
        return false;
      }
    });
  }

  isEmpty() {
    if (this.conditions.length === 0) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  }
}

const ArrayUtility = {
  cleanArray(array) {
    return [];
  },
};

// ma to działać tak:
const formChecker = new Switch();
const value = "testsdf";

formChecker.add(value.length < 5, () => {
  console.error("value is too short");
});

formChecker.add(!value.includes("@"), () => {
  console.error("value is not an email");
});

formChecker.isEmpty() === false;
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
