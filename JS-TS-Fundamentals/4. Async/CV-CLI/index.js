#!/usr/bin/env node
"use strict";
// Stworz aplikacje konsolowa do tworzenia CV
//  Ma posiadac nastepujace komendy:
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
Object.defineProperty(exports, "__esModule", { value: true });
// CV-CLI define-template: pozwala okreslic plik szablonu dla CV // ????
// CV-CLI add-personal: dodaje dane personalne do CV (imie, nazwisko, email)
// CV-CLI add-about: dodaje ogolny opis twojej osoby. Powinna przyjmowac sciezke do pliku tekstowego i go odczytac
// CV-CLI add-edu: dodaje opis twojej edukacji. Powinna dzialac jak komenda add-about
// CV-CLI add-skills: dodaje opis twoich umiejetnosci. Powinno przyjmowac argumenty z lini komend, wraz z ich ocena od 1-5. Ocena powinna sluzyc do wygenerowania pustych/zapelnionych gwiazdek.
// CV-CLI add-image: przyjmuje sciezke do zdjecia ktore ma byc umieszczone w CV
// CV-CLI clear: usuwa wszystkie zapisane dane
// CV-CLI send: pozwala na wyslanie z twojego konta Linkedin wiadomosci do rekruterow. Przyjmuje jako argument liste emaili
const fs = __importStar(require("fs"));
const { program } = require("commander");
const conf = new (require("conf"))();
// UTILITIES
class Skill {
    skillName;
    skillValue;
    constructor(aName, value) {
        this.skillName = aName;
        this.skillValue = "*".repeat(value);
    }
    setSkillValue = (skill) => {
        this.skillValue = "*".repeat(skill);
    };
}
const reader = (FILE) => {
    try {
        console.log(FILE);
        let obj = fs.readFileSync(FILE, "utf8");
        console.log(obj);
        return obj;
    }
    catch (err) {
        return String(err);
    }
};
// MAIN CLASS ******************
class CvBuilder {
    name;
    surname;
    email;
    about;
    edu;
    skills;
    image;
    sendTo;
    constructor() {
        this.name = conf.get("name");
        this.surname = conf.get("surname");
        this.email = conf.get("email");
        this.about = conf.get("about");
        this.edu = conf.get("edu");
        this.skills = conf.get("skills");
        this.image = conf.get("image");
        this.sendTo = conf.get("sendTo");
    }
    // ********** SETTERS **********
    setName = (aName) => {
        this.name = aName;
        conf.set("name", aName);
    };
    setSurname = (aSurname) => {
        this.surname = aSurname;
        conf.set("surname", aSurname);
    };
    setEmail = (anEmail) => {
        this.email = anEmail;
        conf.set("email", anEmail);
    };
    setAbout = (data) => {
        this.about = data;
        conf.set("about", data);
    };
    // ********** HANDLERS **********
    handlePersonals = (data) => {
        const values = data.split(" ");
        if (values.length !== 3)
            throw new Error("Invalid details supplied");
        this.setName(values[0]);
        this.setSurname(values[1]);
        this.setEmail(values[2]);
    };
    handleAbout = async (filepath) => {
        try {
            const data = await reader(filepath);
            console.log(data);
            this.setAbout(data);
        }
        catch (err) {
            console.log(err);
        }
    };
    handleEdu = async (filepath) => {
        try {
            const data = await reader(filepath);
            console.log(data);
            this.edu = data;
            conf.set("edu", data);
        }
        catch (err) {
            console.log(err);
        }
    };
    handleSkills = (data) => {
        if (typeof this.skills === "undefined") {
            this.skills = [];
        }
        const dataSplit = data.split(" ");
        const skillsList = [];
        // VALIDATE
        if (dataSplit.length % 2 !== 0)
            throw new Error("Incorrect input");
        for (let i = 0; i < dataSplit.length; i = i + 2) {
            const name = dataSplit[i];
            const proficiency = parseInt(dataSplit[i + 1]);
            const skillItem = new Skill(name, proficiency);
            skillsList.push(skillItem);
        }
        this.skills = skillsList;
        conf.set("skills", this.skills);
    };
    handleImage = (data) => {
        this.image = data;
        conf.set("image", data);
    };
    handleEmails = (emails) => {
        const emailsList = emails.split(" ");
        // Validate
        emailsList.forEach((email) => {
            if (!email.includes("@"))
                throw new Error("Invald email");
        });
        this.sendTo = emailsList;
        conf.set("sendTo", emailsList);
        const mockURL = "MOCKURL";
        this.sendEmail(emailsList, mockURL);
    };
    composeMessage = () => {
        return `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title>${this.name} ${this.surname} CV </title>

  <style type="text/css">
  </style>    
</head>
<body style="margin:0; padding:0; background-color:#F2F2F2;">
  <center>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2">
        <tr>
            <td align="center" valign="top">
            ${this.name}
            ${this.surname}
            ${this.email}
            ${this.about}
            ${this.edu}
            ${this.skills}
            ${this.image}     
            </td>
        </tr>
    </table>
  </center>
</body>
</html>
    `;
    };
    sendEmail = (emails, url) => {
        // MOCK?
        console.log(JSON.stringify(emails));
        console.log(url);
        const msg = this.composeMessage();
    };
    resetData = () => {
        this.name = "";
        this.surname = "";
        this.email = "";
        this.about = "";
        this.edu = "";
        this.skills = [];
        this.image = "";
        this.sendTo = [];
        conf.set("name", "");
        conf.set("surname", "");
        conf.set("email", "");
        conf.set("about", "");
        conf.set("edu", "");
        conf.set("skills", []);
        conf.set("image", "");
        conf.set("sendTo", []);
    };
}
// MAIN PROGRAM DEFINITION *************
const cv = new CvBuilder();
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
