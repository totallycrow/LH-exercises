// Stwórz fukcjonalność do pobierania i cachowania danych z https://www.googleapis.com/books/v1/volumes?q=clarcson która:
// Pobierze dane poprzez axiosa/fetcha z open api google books na podstawie danego query
// Dla każdego query (q=) który wpisze user, funkcja zapisze plik json w folderze /cache o nazwie szukanego query oraz zwróci pobrane dane
// Ponowne wywołanie danej funkcjonalności z tym samym query powoduje zaserwowanie danych z pliku json

import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import axios from "axios";
import { resolve } from "path";

const pathToCache = "./cache/";
const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const query = "clarcson";

const saveToJSON = async (data: object, location: string) => {
  fs.writeFileSync(location, JSON.stringify(data));
};

interface ICacher {
  checkCache(f: string): boolean;
  setCache(d: object, f: string): void;
  getFromCache(f: string): AnyObject;
}

// Fetcher
// 1. jesteś w stanie opcjonalnie dodać cacher
// 2. możesz dać prawo komuś skipnąć cache - przypadki testowe, dziwne edge casey
// na fontendzie -> do localstorage
// na backendzie -> lokalnego cacha gdy apka jest wystarczająco mała + server udostępnia Ci fs

class Fetcher {
  cacher: null | ICacher = null;

  private runAxiosPromise = async <T>(url: string) => {
    try {
      return { data: await axios.get<T>(url), isError: false, message: "OK" };
    } catch (err) {
      return { data: null, isError: true, message: err as string };
    }
  };

  async runQuery(givenUrl: string, query: string, skipCache: boolean = false) {
    const URL = `${givenUrl}${query}`;
    const FILE = `${pathToCache}${query}.json`;

    if (skipCache) {
      // const res = runAxiosPromise
      // return
      const res = await this.runAxiosPromise(URL);
      return res;
    }

    // ^^ combine vv ?

    if (!this.cacher) {
      // const res = runAxiosPromise
      // return
      const res = await this.runAxiosPromise(URL);
      return res;
    }

    if (this.cacher.checkCache(query)) {
      return this.cacher.getFromCache(query);
    }
  }

  setCacher(cacher: ICacher) {
    this.cacher = cacher;
  }
}

class Cacher implements ICacher {
  checkCache = (FILE: string) => {
    return fs.existsSync(FILE);
  };
  setCache = async (data: object, FILE: string) => {
    await saveToJSON(data, FILE);
  };

  getFromCache = async (FILE: string) => {
    let obj = await JSON.parse(fs.readFileSync(FILE, "utf8"));
    return obj;
  };
}

interface AnyObject {
  [x: string]: any;
}

const main = async (url: string, query: string) => {
  const myFetcher = new Fetcher();

  // czy udało się dobrze pobrać
  const response = await myFetcher.runQuery(apiUrl, query);
  console.log(typeof response);

  if (response) return response.data.data;

  // // czy złapał error
  // myFetcher.runQuery("url");
  // myFetcher.runQuery("url");
  // myFetcher.runQuery("url");

  // const myCacher = new Cacher();

  // myFetcher.setCacher(myCacher);

  // myFetcher.runQuery("123", true);
  // myFetcher.runQuery("123");

  // myFetcher.runQuery();
  // myFetcher.runQuery();
  // myFetcher.runQuery();
  // myFetcher.runQuery();

  // // GET -> /api/users/

  // // getUsers
  // // return Fetcher.runQuery("adawdad")
  // // res.json(users)
};

// @ts-ignore
async function testing() {
  const test = await main(apiUrl, query);
  console.log(test);
}
testing();

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
