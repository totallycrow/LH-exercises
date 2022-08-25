"use strict";
// Stwórz fukcjonalność do pobierania i cachowania danych z https://www.googleapis.com/books/v1/volumes?q=clarcson która:
// Pobierze dane poprzez axiosa/fetcha z open api google books na podstawie danego query
// Dla każdego query (q=) który wpisze user, funkcja zapisze plik json w folderze /cache o nazwie szukanego query oraz zwróci pobrane dane
// Ponowne wywołanie danej funkcjonalności z tym samym query powoduje zaserwowanie danych z pliku json
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
const pathToCache = "./cache/";
const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const query = "clarcson";
const saveToJSON = async (data, location) => {
    fs.writeFileSync(location, JSON.stringify(data));
};
// Fetcher
// 1. jesteś w stanie opcjonalnie dodać cacher
// 2. możesz dać prawo komuś skipnąć cache - przypadki testowe, dziwne edge casey
// na fontendzie -> do localstorage
// na backendzie -> lokalnego cacha gdy apka jest wystarczająco mała + server udostępnia Ci fs
class Fetcher {
    cacher = null;
    runAxiosPromise = async (url) => {
        try {
            return { data: await axios_1.default.get(url), isError: false, message: "OK" };
        }
        catch (err) {
            return { data: null, isError: true, message: err };
        }
    };
    async runQuery(givenUrl, query, skipCache = false) {
        // const URL = `${givenUrl}${query}`;
        // const FILE = `${pathToCache}${query}.json`;
        if (skipCache) {
            // const res = runAxiosPromise
            // return
            const res = await this.runAxiosPromise(givenUrl);
            return res;
        }
        // ^^ combine vv ?
        if (!this.cacher) {
            // const res = runAxiosPromise
            // return
            console.log("cache not found");
            const res = await this.runAxiosPromise(givenUrl);
            return res;
        }
        if (this.cacher.checkCache(query)) {
            return this.cacher.getFromCache(query);
        }
    }
    setCacher(cacher) {
        this.cacher = cacher;
    }
}
class Cacher {
    checkCache = (FILE) => {
        return fs.existsSync(FILE);
    };
    setCache = async (data, FILE) => {
        await saveToJSON(data, FILE);
    };
    getFromCache = async (FILE) => {
        console.log("CACHED FILE:");
        let obj = await JSON.parse(fs.readFileSync(FILE, "utf8"));
        return obj;
    };
}
const main = async (url, query) => {
    const URL = `${apiUrl}${query}`;
    const FILE = `${pathToCache}${query}.json`;
    const myFetcher = new Fetcher();
    const response = await myFetcher.runQuery(URL, query);
    myFetcher.setCacher(new Cacher());
    if (!response)
        throw new Error("Error fetching data");
    myFetcher.cacher?.setCache(response.data.data, FILE);
    console.log(myFetcher.cacher?.getFromCache(FILE));
    return myFetcher.cacher?.getFromCache(FILE);
};
// @ts-ignore
async function testing() {
    const test = await main(apiUrl, query);
    console.log(test);
}
testing();
