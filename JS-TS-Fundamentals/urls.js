"use strict";
const arrayRegexp = /^.*[[.\d]]$/;
// const isNumber = (variableToCheck: any): variableToCheck is Array =>
//   typeof (variableToCheck as Array)[0] !== "string" ;
function getUrlParameters(url) {
    const query = "?" + url.split("?")[1];
    const params = new URLSearchParams(query);
    // const result: { 
    //   [x: string]: Array<string | number> | string | number;
    // } = {};
    const result = new Map();
    for (let [key, value] of params.entries()) {
        if (key.match(arrayRegexp)) {
            const validKey = key.split("[")[0];
            const validIndex = parseInt(key.split("[")[1].slice(0, -1));
            const hasKey = Object.hasOwn(result, validKey);
            result.has(validKey);
            // TypeGuard na Array<string | number>
            if (hasKey && isArray) {
                const abc = result[validKey];
                result[validKey][validIndex] = value;
                const current = result.get(validKey);
                current[validKey] = value;
                result.set(validKey, current);
                continue;
            }
            const newArray = [];
            newArray[validIndex] = value;
            result = { ...result, [validKey]: newArray };
            // ELSE ITEM IS NOT A PART OF AN ARRAY
            continue;
        }
        result = { ...result, [key]: value };
    }
    return result;
}
const urlString = "https://url.com/post?colors[2]=red&valid=true&colors[0]=green&user=Jan&age=25";
const result = getUrlParameters(urlString);
// result === { colors: [ 'green', undefined, 'red' ], valid: true, user: 'Jan', age: 25 }
console.log(result);
console.log("test");
