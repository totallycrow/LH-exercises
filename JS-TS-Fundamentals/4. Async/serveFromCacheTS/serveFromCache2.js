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
        let obj = await JSON.parse(fs.readFileSync(FILE, "utf8"));
        return obj;
    };
}
const main = async (url, query) => {
    const myFetcher = new Fetcher();
    // czy udało się dobrze pobrać
    const response = await myFetcher.runQuery(apiUrl, query);
    console.log(typeof response);
    if (response)
        return response.data.data;
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
function testfunction(param1, param2) { }
testfunction("test", 9);
