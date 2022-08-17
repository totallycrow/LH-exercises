function getUrlParameters(url: string) {
  const query = "?" + url.split("?")[1];
  const params = new URLSearchParams(query);

  let arrayRegexp = /^.*[[.\d]]$/;

  let result = {};

  // Display the key/value pairs
  for (let [key, value] of params.entries()) {
    // Check if key is a part of an array
    if (key.match(arrayRegexp)) {
      console.log(key);
      const validKey = key.split("[")[0];
      const validIndex = parseInt(key.split("[")[1].slice(0, -1));
      console.log(validKey);
      console.log(validIndex);

      //   check if correct key has already been created
      const hasKey = Object.hasOwn(result, validKey);

      if (hasKey) {
        console.log("VALID KEY FOUND");

        console.log("HAS KEY: VALUE");
        console.log(value);
        console.log(validKey);

        let newObj = { ...result };

        //       Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
        // No index signature with a parameter of type 'string' was found on type '{}'.ts(7053)

        let newArray = newObj[validKey];

        newArray[validIndex] = value;
      } else {
        let newArray = [];
        newArray[validIndex] = value;
        result = { ...result, [validKey]: newArray };
      }

      // ELSE ITEM IS NOT A PART OF AN ARRAY
    } else {
      result = { ...result, [key]: value };
    }
  }
  return result;
}

const urlString =
  "https://url.com/post?colors[2]=red&valid=true&colors[0]=green&user=Jan&age=25";
const result = getUrlParameters(urlString);
// result === { colors: [ 'green', undefined, 'red' ], valid: true, user: 'Jan', age: 25 }

console.log(result);
console.log("test");
