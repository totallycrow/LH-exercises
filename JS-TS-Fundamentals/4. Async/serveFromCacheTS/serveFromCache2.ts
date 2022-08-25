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

// ********************
// ********************
// ********************

const saveToJSON = async (data: object, location: string) => {
  fs.writeFileSync(location, JSON.stringify(data));
};

interface AnyObject {
  [x: string]: any;
}

interface ICacher {
  checkCache(f: string): boolean;
  setCache(d: object, f: string): void;
  getFromCache(f: string): AnyObject;
}

// ********************
// ********* FETCHER ***********
// ********************

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
    if (skipCache) {
      const res = await this.runAxiosPromise(givenUrl);
      return res;
    }

    // ^^ combine vv ?

    if (!this.cacher) {
      console.log("cache not found");
      const res = await this.runAxiosPromise(givenUrl);
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

// ********************
// ****** CACHER ******
// ********************

class Cacher implements ICacher {
  checkCache = (FILE: string) => {
    return fs.existsSync(FILE);
  };
  setCache = async (data: object, FILE: string) => {
    await saveToJSON(data, FILE);
  };

  getFromCache = async (FILE: string) => {
    console.log("CACHED FILE:");
    let obj = await JSON.parse(fs.readFileSync(FILE, "utf8"));
    return obj;
  };
}

const main = async (url: string, query: string) => {
  const URL = `${url}${query}`;
  const FILE = `${pathToCache}${query}.json`;

  const myFetcher = new Fetcher();

  const response = await myFetcher.runQuery(URL, query);

  myFetcher.setCacher(new Cacher());

  if (!response) throw new Error("Error fetching data");

  myFetcher.cacher?.setCache(response.data.data, FILE);
  console.log(myFetcher.cacher?.getFromCache(FILE));

  return myFetcher.cacher?.getFromCache(FILE);
};

// ********************
// ********************
// ********************

// @ts-ignore
async function testing() {
  const test = await main(apiUrl, query);
  console.log(test);
}
testing();

// ********************
// ********************
// ********************

// Fetcher
// 1. jesteś w stanie opcjonalnie dodać cacher
// 2. możesz dać prawo komuś skipnąć cache - przypadki testowe, dziwne edge casey
// na fontendzie -> do localstorage
// na backendzie -> lokalnego cacha gdy apka jest wystarczająco mała + server udostępnia Ci fs
