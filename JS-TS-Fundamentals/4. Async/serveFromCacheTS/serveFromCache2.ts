// Stwórz fukcjonalność do pobierania i cachowania danych z https://www.googleapis.com/books/v1/volumes?q=clarcson która:
// Pobierze dane poprzez axiosa/fetcha z open api google books na podstawie danego query
// Dla każdego query (q=) który wpisze user, funkcja zapisze plik json w folderze /cache o nazwie szukanego query oraz zwróci pobrane dane
// Ponowne wywołanie danej funkcjonalności z tym samym query powoduje zaserwowanie danych z pliku json

import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import axios from "axios";
import { resolve } from "path";

const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const query = "clarcson";

const saveToJSON = async (data: JSON, location: string) => {
  fs.writeFileSync(location, JSON.stringify(data));
};

// Fetcher

// How to debug promises? -> pending

class Fetcher {
  constructor() {}

  runPromise = async (url: string) => {
    let response;
    try {
      response = await axios.get(url);
    } catch (err) {
      return err;
    }

    // const data = await promise.then(res => res.data.js)
    return response.data;
  };

  static getFromCache = async (FILE: string) => {
    let obj = await JSON.parse(fs.readFileSync(FILE, "utf8"));
    return obj;
  };
}

class Cacher {
  static checkCache = async (FILE: string) => {
    return fs.existsSync(FILE);
  };
  static setCache = async (data: JSON, FILE: string) => {
    await saveToJSON(data, FILE);
  };
}

const main = async (url: string, query: string) => {
  const URL = `${apiUrl}${query}`;
  const FILE = `./cache/${query}.json`;

  const isCached = await Cacher.checkCache(FILE);

  if (isCached) {
    const dataFromCache = await Fetcher.getFromCache(FILE);

    return dataFromCache;
  }

  const fetcher = new Fetcher();
  const data = await fetcher.runPromise(URL);

  await Cacher.setCache(data, FILE);
  return data;
};

// how to test/debug promises? // pending? / can't await at top level

// @ts-ignore
async function testing() {
  const test = await main(apiUrl, query);
  return test;
}

// Top-level 'await' expressions are only allowed when the 'module' option is set to 'es2022', 'esnext', 'system', 'node16', or 'nodenext', and the 'target' option is set to 'es2017' or higher.ts(1378)

const testval = await testing();
console.log(testval);

// Cacher

// const fetcher = new Fetcher()
// .runPromise()
// .query()

// nie zapisane
// const { res, err, message } = fetcher.query("api");

// fetcher.setCache();

// const res2 = fetcher.query("api");
// const fromCache = fetcher.query("api");

// // Can/Should you instantiate classess inside functions?

// const functionWithAxios = async (url: string, query: string) => {
//   const URL = `${apiUrl}${query}`;
//   const FILE = `./cache/${query}.json`;

//   if (fs.existsSync(FILE)) {
//     console.log("FOUND FILE");
//     let obj = JSON.parse(fs.readFileSync(FILE, "utf8"));
//     return obj;
//   } else {
//     console.log("NOT FOUND");
//     let data = await axios.get(URL).then((res) => res.data);
//     console.log(data);
//     await saveToJSON(data, FILE);
//     return data;
//   }
// };

// const tester = async () => {
//   await functionWithAxios(apiUrl, query);
// };

// console.log(tester);
// await functionWithFetch();

// chain of responsibility

// a -> b

// const getButn = () => query => { next:true }

// pipe <--- ramda.js
//      10       10       45
// COR.run([getButn, getInput, asvasd], options)

// runNext(getInput)

// try
// await getInput()

// catch (err)
//   options.handleError(err)
// return

// fetcher.errorHandler({
//   errorCode: 'input::adress::street',
//   message: "asdasdasd"
// })

// const res = {
//   errorInputs: [
//     { adress_street: { isError: true, message: "asdasdasd", response:null }}
//   ],
//   isError: false
// }
