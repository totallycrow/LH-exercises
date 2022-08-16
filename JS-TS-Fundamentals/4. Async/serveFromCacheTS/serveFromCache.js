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
const node_fetch_1 = __importDefault(require("node-fetch"));
const axios_1 = __importDefault(require("axios"));
const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const query = "clarcson";
const saveToJSON = async (data, location) => {
    fs.writeFileSync(location, JSON.stringify(data));
};
const functionWithFetch = async (url, query) => {
    const URL = `${apiUrl}${query}`;
    const FILE = `./cache/${query}.json`;
    if (fs.existsSync(FILE)) {
        console.log("FOUND FILE");
        let obj = JSON.parse(fs.readFileSync(FILE, "utf8"));
        return obj;
    }
    else {
        console.log("NOT FOUND");
        let data = await (0, node_fetch_1.default)(URL).then((res) => res.json());
        console.log(data);
        // AS JSON, VS AXIOS NO AS JSON?
        await saveToJSON(data, FILE);
        return data;
    }
};
console.log(await functionWithFetch(apiUrl, query));
const functionWithAxios = async (url, query) => {
    const URL = `${apiUrl}${query}`;
    const FILE = `./cache/${query}.json`;
    if (fs.existsSync(FILE)) {
        console.log("FOUND FILE");
        let obj = JSON.parse(fs.readFileSync(FILE, "utf8"));
        return obj;
    }
    else {
        console.log("NOT FOUND");
        let data = await axios_1.default.get(URL).then((res) => res.data);
        console.log(data);
        await saveToJSON(data, FILE);
        return data;
    }
};
console.log(await functionWithAxios(apiUrl, query));
// await functionWithFetch();
