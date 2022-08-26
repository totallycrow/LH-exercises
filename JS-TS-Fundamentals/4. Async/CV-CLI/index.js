#!/usr/bin/env node
"use strict";
// Stworz aplikacje konsolowa do tworzenia CV
//  Ma posiadac nastepujace komendy:
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
// CV-CLI define-template: pozwala okreslic plik szablonu dla CV // ????
// CV-CLI add-personal: dodaje dane personalne do CV (imie, nazwisko, email)
// CV-CLI add-about: dodaje ogolny opis twojej osoby. Powinna przyjmowac sciezke do pliku tekstowego i go odczytac
// CV-CLI add-edu: dodaje opis twojej edukacji. Powinna dzialac jak komenda add-about
// CV-CLI add-skills: dodaje opis twoich umiejetnosci. Powinno przyjmowac argumenty z lini komend, wraz z ich ocena od 1-5. Ocena powinna sluzyc do wygenerowania pustych/zapelnionych gwiazdek.
// CV-CLI add-image: przyjmuje sciezke do zdjecia ktore ma byc umieszczone w CV
// CV-CLI clear: usuwa wszystkie zapisane dane
// CV-CLI send: pozwala na wyslanie z twojego konta Linkedin wiadomosci do rekruterow. Przyjmuje jako argument liste emaili
const { program } = require("commander");
const CVBuilder_js_1 = __importDefault(require("./utils/CVBuilder.js"));
// ************* APP *************
const init = () => {
    const cv = new CVBuilder_js_1.default();
    program
        .command("define-template <filepath>")
        .description("Add a path to a file template")
        .action(cv.handleTemplate);
    program
        .command("add-personal <data>")
        .description("Add name, surname, and email")
        .action(cv.handlePersonals);
    program
        .command("add-about <data>")
        .description("Add a path to a text file containing your personal information")
        // HOW TO AWAIT?
        .action(cv.handleAbout);
    program
        .command("add-edu <data>")
        .description("Add a path to a text file containing your education information")
        // HOW TO AWAIT?
        .action(cv.handleAbout);
    program
        .command("add-skills <skills>")
        .description("Add skills and their respective proficiency as a number")
        .action(cv.handleSkills);
    program
        .command("add-image <filepath>")
        .description("Add a path to a desired image")
        .action(cv.handleImage);
    program
        .command("clear")
        .description("Removes all currently held data")
        .action(cv.resetData);
    program
        .command("send <emails>")
        .description("Add a path to a desired image")
        .action(cv.handleEmails);
    program.parse();
    console.log(cv.name);
    console.log(cv.surname);
    console.log(cv.email);
    console.log(cv.about);
    console.log(cv.skills);
    console.log(cv.image);
    console.log(cv.sendTo);
    console.log(cv.template);
};
exports.init = init;
(0, exports.init)();
