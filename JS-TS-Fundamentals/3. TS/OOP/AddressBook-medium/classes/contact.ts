// *********************************************************
// *********************** CONTACT *************************
// *********************************************************

export interface Person {
  name: string;
  surname: string;
  email: string;
}

export class Contact implements Person {
  // Ma mieć: Imie, Nazwisko, adres-emial, datę modyfikacji i utworzenia, uuid
  // Ma umożliwiać: aktualizację datę modyfikacji, pozwalac na modyfikację imienia, nazwiska oraz adresu email

  // ******
  // can;t private because of the interface?
  // Class 'Contact' incorrectly implements interface 'Person'.
  // Property 'name' is private in type 'Contact' but not in type 'Person'.ts(2420)

  id: string;
  name: string;
  surname: string;
  email: string;
  private creationDate: Date;
  private modificationDate: Date;
  constructor(obj: Person, id: string) {
    this.id = id;
    this.name = obj.name;
    this.surname = obj.surname;
    this.email = obj.surname;
    this.creationDate = new Date();
    this.modificationDate = new Date();
  }

  setModificationDate = (newDate: Date): void => {
    this.modificationDate = newDate;
  };

  setName = (name: string) => {
    this.name = name;
  };

  setSurname = (surname: string) => {
    this.surname = surname;
  };

  setEmail = (email: string) => {
    this.email = email;
  };

  toString = () => {
    const result = Object.values(this)
      .filter(
        (el) =>
          typeof el === "string" ||
          Object.prototype.toString.call(el) === "[object Date]"
      )
      .join(" ");
    return result;
  };
}
