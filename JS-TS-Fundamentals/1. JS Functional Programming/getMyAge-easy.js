function getMyAge(input) {
  // 1. typy
  // jeśli typ date => handleDate
  // jeśli typ string => handleString
  // jeśli typ number => handleNumber

  // 2. logika
  // jeśli podana data jest przyszła

  // 3. wymaganie biznesowym
  // nie można wprowadzić roku przed 1990

  // VALIDATION
  const inputType = Object.prototype.toString.call(input);
  let yourBirthYear;

  // Set valid birth year between 1990 and 2022 as per business requirements
  const validYear = /(199\d|20[01]\d|202[0-2])/;

  // Validate input data type and assign birth year as string
  if (inputType === "[object String]") {
    yourBirthYear = input;
  } else if (inputType === "[object Date]") {
    yourBirthYear = String(input.getFullYear());
  } else if (inputType === "[object Number]") {
    yourBirthYear = String(input);
  } else throw new Error("Incorrect input type");

  // Validate correct year
  if (yourBirthYear.match(validYear) === null) {
    throw new Error("Invalid birth year");
  }

  const currentYear = parseInt(new Date().getFullYear());
  return currentYear - parseInt(yourBirthYear);
}

// TESTING

console.log(getMyAge(new Date(1990, 1, 1)));
console.log(getMyAge(1990));
console.log(getMyAge("1990"));

//test for errors
// console.log(getMyAge(["1995"]));
// console.log(getMyAge("3000"));
// console.log(getMyAge(new Date(1980, 1, 1)));
// console.log(getMyAge({ year: "1990" }));
