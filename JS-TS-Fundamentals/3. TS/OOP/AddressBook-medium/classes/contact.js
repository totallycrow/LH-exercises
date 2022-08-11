"use strict";
// *********************************************************
// *********************** CONTACT *************************
// *********************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
class Contact {
    // Ma mieć: Imie, Nazwisko, adres-emial, datę modyfikacji i utworzenia, uuid
    // Ma umożliwiać: aktualizację datę modyfikacji, pozwalac na modyfikację imienia, nazwiska oraz adresu email
    // ******
    // can;t private because of the interface?
    // Class 'Contact' incorrectly implements interface 'Person'.
    // Property 'name' is private in type 'Contact' but not in type 'Person'.ts(2420)
    id;
    name;
    surname;
    email;
    creationDate;
    modificationDate;
    constructor(obj, id) {
        this.id = id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.email = obj.surname;
        this.creationDate = new Date();
        this.modificationDate = new Date();
    }
    setModificationDate = (newDate) => {
        this.modificationDate = newDate;
    };
    setName = (name) => {
        this.name = name;
    };
    setSurname = (surname) => {
        this.surname = surname;
    };
    setEmail = (email) => {
        this.email = email;
    };
    toString = () => {
        const result = Object.values(this)
            .filter((el) => typeof el === "string" ||
            Object.prototype.toString.call(el) === "[object Date]")
            .join(" ");
        return result;
    };
}
exports.Contact = Contact;
