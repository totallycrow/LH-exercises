function filterWith(arr, phrase) {
  // 1. sprawdz string/number
  // 2. sprawdz array
  // 3. sprawdz obiekt

  // VALIDATION

  // Input array validation
  if (!Array.isArray(arr) || arr.length <= 0) {
    throw new Error("Valid array must be provided");
  }

  // Phrase validation
  const inputPhraseType = Object.prototype.toString.call(phrase);
  if (
    inputPhraseType !== "[object String]" &&
    inputPhraseType !== "[object Number]"
  ) {
    throw new Error("Valid phrase must be provided");
  }

  if (String(phrase).length < 2) {
    return [];
  }

  const phraseRegexp = new RegExp(phrase);

  // MAIN SEARCH
  return arr.filter((element) =>
    isPhraseInObject(element, phrase, phraseRegexp)
  );
}

// ************* HELPER FUNCTIONS *****************

const isPhraseInObject = (item, phraseRegexp) => {
  // OBJECT VALIDATION
  const itemType = Object.prototype.toString.call(item);

  // CHECK OBJECT
  if (itemType === "[object Object]") {
    const itemValues = Object.values(item);

    const matchedItemValues = itemValues.filter((element) => {
      if (typeof element === "string" || typeof element === "number") {
        return isTwoPhrasesMaching(phraseRegexp, element);
      }
      if (Array.isArray(element)) {
        const clonedArray = [...element];

        for (let i = 0; i < clonedArray.length; i++) {
          if (isPhraseInObject(clonedArray[i], phraseRegexp)) {
            return true;
          }
        }
      }
    });

    if (matchedItemValues.length > 0) {
      return true;
    }
    return false;
  }

  // CHECK STRING/NUMBER
  if (isTwoPhrasesMaching(phrase, item)) {
    return true;
  }

  return false;
};

function isTwoPhrasesMaching(givenPhrase, itemPhrase) {
  const match = String(itemPhrase).match(phraseRegexp);

  const isNotNull = match !== null;
  return isNotNull;
}
// ********************* DATA ***************************

const data = [
  {
    _id: "5e985a07feddae7617ac44f6",
    age: 24,
    eyeColor: "brown",
    name: "Cummings Baxter",
    gender: "male",
    company: "VELOS",
    email: "cummingsbaxter@velos.com",
    phone: "+1 (907) 482-2451",
    tags: ["labore", "elit", "excepteur", "nisi", "mollit", "anim", "aliquip"],
    friends: [
      {
        id: 0,
        name: "Sheppard Jensen",
      },
    ],
  },
  {
    _id: "5e985a0709dfa1e6fd93c6ad",
    age: 32,
    eyeColor: "brown",
    name: "Madelyn Dickson",
    gender: "female",
    company: "KENGEN",
    email: "madelyndickson@kengen.com",
    phone: "+1 (984) 521-2439",
    tags: ["nisi", "veniam", "dolore", "officia", "ex", "non", "pariatur"],
    friends: [
      {
        id: 0,
        name: "Bruce Barton",
      },
      {
        id: 1,
        name: "Juliet Schmidt",
      },
      {
        id: 2,
        name: "Horton Haley",
      },
      {
        id: 3,
        name: "Herminia Witt",
      },
    ],
  },
  {
    _id: "5e985a0737e2306e9aef6ecd",
    age: 26,
    eyeColor: "blue",
    name: "Mcguire Mercado",
    gender: "male",
    company: "LINGOAGE",
    email: "mcguiremercado@lingoage.com",
    phone: "+1 (963) 450-2194",
    tags: ["cupidatat", "occaecat", "amet", "qui", "elit", "esse", "deserunt"],
    friends: [
      {
        id: 0,
        name: "Loraine Harper",
      },
      {
        id: 1,
        name: "Luann Randall",
      },
      {
        id: 2,
        name: "Obrien Rich",
      },
      {
        id: 3,
        name: "Noble Wilkerson",
      },
    ],
  },
  {
    _id: "5e985a07148cfba58c860ec2",
    age: 26,
    eyeColor: "brown",
    name: "Marina Porter",
    gender: "female",
    company: "GORGANIC",
    email: "marinaporter@gorganic.com",
    phone: "+1 (867) 417-3497",
    tags: [
      "laborum",
      "aliquip",
      "sit",
      "adipisicing",
      "aute",
      "cupidatat",
      "aliquip",
    ],
    friends: [
      {
        id: 0,
        name: "Blair Hill",
      },
      {
        id: 1,
        name: "Ebony Jimenez",
      },
    ],
  },
  {
    _id: "5e985a074984f9f08ccaaa4c",
    age: 25,
    eyeColor: "green",
    name: "Barlow Ferguson",
    gender: "male",
    company: "TOYLETRY",
    email: "barlowferguson@toyletry.com",
    phone: "+1 (837) 484-2231",
    tags: ["est", "dolor", "minim", "ut", "anim", "culpa", "non"],
    friends: [
      {
        id: 0,
        name: "Delacruz Acevedo",
      },
      {
        id: 1,
        name: "Gloria Tanner",
      },
      {
        id: 2,
        name: "Cantrell Myers",
      },
      {
        id: 3,
        name: "Fisher Leonard",
      },
    ],
  },
];

// ******************* TEST **************************

console.log("****************");
console.log("****************");
console.log("****************");
console.log(
  "*****************************************************************************"
);
const resultTest = filterWith(data, "nisi");
console.log("------TEST RESULT ARRAY: ------------");
console.log(resultTest);
