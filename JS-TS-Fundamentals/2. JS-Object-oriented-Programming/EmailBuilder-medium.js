class EmailBuilder {
  constructor() {
    this._mail = {
      from: "",
      to: "",
      title: "",
      cc: [],
      bcc: [],
      html: "",
    };
  }

  // Stwórz metody które będą zmieniać parametry from, to, title, cc, bcc, html

  // ??????
  //   setFrom(from) {
  //     this._mail.from = from;
  //     return this;
  //   };

  //   SETTERS

  setFrom = (sender) => {
    emailValidator.isEmail(sender);
    this._mail.from = sender;
    return this;
  };

  setTo = (recipient) => {
    emailValidator.isEmail(recipient);

    this._mail.to = recipient;
    return this;
  };

  setTitle = (title) => {
    emailValidator.validateString(title);

    this._mail.title = title;
    console.log("THIS RETURN");
    console.log(this);
    return this;
  };

  setCc = (ccArray) => {
    console.log(ccArray);
    emailValidator.isEmailsArray(ccArray);
    this._mail.cc = ccArray;
    return this;
  };

  setBcc = (bccArray) => {
    emailValidator.isEmailsArray(bccArray);
    this._mail.bcc = bccArray;
    return this;
  };

  setHtml = (html) => {
    emailValidator.validateString(html);
    this._mail.html = html;
    return this;
  };

  //   **** Generate JSON *****
  buildMail = () => {
    // Zwróć finalnego maila
    return JSON.stringify(this._mail);
  };
}

// HELPERS

class emailValidator {
  static isEmail(address) {
    if (typeof address === "string" && address.includes("@")) {
      return true;
    }
    throw new Error("Invalid email address");
  }
  static validateString(input) {
    if (typeof input === "string") {
      return true;
    }
    throw new Error("Invalid input");
  }
  static isEmailsArray(array) {
    if (!Array.isArray(array)) {
      throw new Error("Invalid array");
    }
    if (array.length === 0) {
    }
    return array.every((address) => {
      this.isEmail(address);
    });
  }
}

// Wykorzystując wzorzec projektowy Builder stwórz obiekt json reprezentujacy wszystkie parametry maila (parametry znajdują sie w kodzie poniżej)

// ***************** TESTING *********************

const testMail = new EmailBuilder()
  .setFrom("test@")
  .setTo("john@")
  .setTitle("IMPORTANT MESSAGE")
  .setCc(["William@", "dude@"])
  .setBcc(["Barney@", "Leon@"])
  .setHtml("<h1>Header</h1><p>Lorem Ipsum</p>")
  .buildMail();
console.log(testMail);

// why return this doesnt overwrite remaining fields to default?

// console.log(new EmailBuilder().setTitle("test"));
