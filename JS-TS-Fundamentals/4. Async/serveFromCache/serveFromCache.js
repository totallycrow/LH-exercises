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

const saveToJSON = async (data, location) => {
  fs.writeFileSync(location, JSON.stringify(data));
};

const functionWithFetch = async () => {
  const URL = `${apiUrl}${query}`;
  const FILE = `./cache/${query}.json`;

  if (fs.existsSync(FILE)) {
    console.log("FOUND FILE");
    let obj = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return obj;
  } else {
    console.log("NOT FOUND");
    let data = await fetch(URL).then((res) => res.json());
    console.log(data);
    await saveToJSON(data, FILE);
    return data;
  }
};

console.log(await functionWithFetch(apiUrl, query));

const functionWithAxios = async () => {
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

console.log(await functionWithAxios(apiUrl, query));
// await functionWithFetch();
