type birthYear = number | string | Date;

export default function getMyAge(input: birthYear): number {
  let yourBirthYear: string;

  if (typeof input === "number") {
    yourBirthYear = String(input);
  } else if (input instanceof Date) {
    yourBirthYear = String(input.getFullYear());
  } else {
    yourBirthYear = input;
  }

  // Validate correct year
  // Set valid birth year between 1990 and 2022 as per business requirements
  const validYear = /(199\d|20[01]\d|202[0-2])/;
  if (yourBirthYear.match(validYear) === null) {
    throw new Error("Invalid birth year");
  }

  const currentYear = new Date().getFullYear();
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

// Pick / Omit / union types with objects { property: "height", value:number } | { property: "name", value:string }
