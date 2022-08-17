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
const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const query = "clarcson";
const saveToJSON = async (data, location) => {
    fs.writeFileSync(location, JSON.stringify(data));
};
// Fetcher
// How to debug promises? -> pending
class Fetcher {
    constructor() { }
    runPromise = async (url) => {
        let response;
        try {
            response = await axios_1.default.get(url);
        }
        catch (err) {
            return err;
        }
        // const data = await promise.then(res => res.data.js)
        return response.data;
    };
    static getFromCache = async (FILE) => {
        let obj = await JSON.parse(fs.readFileSync(FILE, "utf8"));
        return obj;
    };
}
class Cacher {
    static checkCache = async (FILE) => {
        return fs.existsSync(FILE);
    };
    static setCache = async (data, FILE) => {
        await saveToJSON(data, FILE);
    };
}
const main = async (url, query) => {
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
