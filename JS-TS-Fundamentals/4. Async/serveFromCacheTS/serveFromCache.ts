// Stwórz fukcjonalność do pobierania i cachowania danych z https://www.googleapis.com/books/v1/volumes?q=clarcson która:
// Pobierze dane poprzez axiosa/fetcha z open api google books na podstawie danego query
// Dla każdego query (q=) który wpisze user, funkcja zapisze plik json w folderze /cache o nazwie szukanego query oraz zwróci pobrane dane
// Ponowne wywołanie danej funkcjonalności z tym samym query powoduje zaserwowanie danych z pliku json

import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import axios from "axios";

const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const query = "clarcson";

const saveToJSON = async (data: JSON, location: string) => {
  fs.writeFileSync(location, JSON.stringify(data));
};

// Fetcher
// Cacher

// const fetcher = new Fetcher()
// .runPromise()
// .query()

// nie zapisane
const { res, err, message } = fetcher.query("api");

fetcher.setCache();

const res2 = fetcher.query("api");
const fromCache = fetcher.query("api");

const functionWithFetch = async (url: string, query: string) => {
  const URL = `${apiUrl}${query}`;
  const FILE = `./cache/${query}.json`;

  // return runOptionaly([ simpleParse, parseWithCache ], isCache)

  if (fs.existsSync(FILE)) {
    console.log("FOUND FILE");
    let obj = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return obj;
  }
  console.log("NOT FOUND");
  let data = await fetch(URL).then((res) => res.json());
  console.log(data);
  // AS JSON, VS AXIOS NO AS JSON?
  await saveToJSON(data as JSON, FILE);
  return data;
};

const tester2 = async () => {
  await functionWithFetch(apiUrl, query);
};

console.log(tester2);

const functionWithAxios = async (url: string, query: string) => {
  const URL = `${apiUrl}${query}`;
  const FILE = `./cache/${query}.json`;

  if (fs.existsSync(FILE)) {
    console.log("FOUND FILE");
    let obj = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return obj;
  } else {
    console.log("NOT FOUND");
    let data = await axios.get(URL).then((res) => res.data);
    console.log(data);
    await saveToJSON(data, FILE);
    return data;
  }
};

const tester = async () => {
  await functionWithAxios(apiUrl, query);
};

console.log(tester);
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
