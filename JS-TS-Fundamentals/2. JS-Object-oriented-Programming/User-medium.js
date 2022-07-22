// Stwórz dwie klasy dla struktury danych związanych z użytkownikiem(wytyczne w kodzie poniżej)
// Klasa User ma dostępne dwa poziomy dostępu: normal i admin.
// Powinna umożliwiać zmianę hasła, emaila oraz poziomu dostępu.
// User z poziomem dostępu = "admin" może zmieniać hasła,emaile oraz poziomy dostępu innych użytkowników.
// Klasa App powinna zarządzać relacjami pomiędzy użytkownikami.
// Zawiera listę użytkowników, pozwala tworzyć nowych użytkowników o różnych poziomach dostępu.

// Cele opcjonalne do wykonania

//     Stwórz klase pomocniczną Validator, która będzie posiadała metody statyczne odpowiedzalne za walidacje usera. Jeżeli któraś z walidacji się nie powiedzie, instancja ma nie być tworzona, tylko ma zwracać error z odpowiednim komunikatem o niepowiedzionej walidacji. W razie problemów przy tworzeniu klasy validator, polecam zapoznać się z dokumentacja biblioteki is.js.

// Podczas walidacji upewnij się, że:
// - email jest poprawnym emailem
// - hasło ma mieć min 8 znaków, co najmniej jedną wielką literę i co najmniej jedną cyfrę oraz co najmniej 1 znak specjalny
// - data (nieważne jaka wejdzie) do konstruktora musi wejść w formacie MM/DD/YYYY
// - imię i nazwisko musi być niepuste

// *********************************************************
// *********************** USER ****************************
// *********************************************************

// Assuming new user can only be created by App Class.
// Otherwise -> validation in constructor too?
class User {
  constructor(user, access, id = "") {
    (this.id = id),
      (this.name = user.name),
      (this.surname = user.surname),
      (this.dob = user.dob),
      (this.password = user.password),
      (this.email = user.email),
      (this.access = access);
  }

  setPassword = (newPassword) => {
    this.password = newPassword;
  };

  setEmail = (newEmail) => {
    this.email = newEmail;
  };

  setAccess = (access) => {
    this.access = access;
  };
}

// *********************************************************
// *********************** APP *****************************
// *********************************************************

class App {
  constructor() {
    if (App._instance) {
      throw new Error(
        "Singleton classes can't be instantiated more than once."
      );
    }
    App._instance = this;

    this.userList = [];
  }

  createUser = (userObj, access) => {
    Validator.ValidateUser(userObj);

    let newUser = new User(userObj, access, idGenerator());
    newUser.dob = formatBirthDate(newUser.dob);

    this.userList.push(newUser);
  };

  createAdmin = (userObj) => {
    this.createUser(userObj, "admin");
  };

  //   ADMIN SET PASSWORD
  setUserPassword = (adminId, userId, newPass) => {
    const userIndex = Validator.validateAdminAndUser(
      adminId,
      userId,
      this.userList
    );

    this.userList[userIndex].setPassword(newPass);
    console.log(`Password changed successfully to: ${newPass}`);
    console.log("VALIDATED OK");

    // if (!Validator.isAdmin(this.userList, adminId)) {
    //   throw new Error("Invalid admin access");
    // }
    // const userIndex = Validator.findUserById(this.userList, userId);

    // if (userIndex > 0) {
    //   this.userList[userIndex].setPassword(newPass);
    //   console.log(`Password changed successfully to: ${newPass}`);
    //   return true;
    // }

    // throw new Error("User not found");
  };

  //   ADMIN SET EMAIL
  setUserEmail = (adminId, userId, newEmail) => {
    const userIndex = Validator.validateAdminAndUser(
      adminId,
      userId,
      this.userList
    );

    this.userList[userIndex].setEmail(newEmail);
    console.log(`Email changed successfully to: ${newEmail}`);

    console.log("VALIDATED OK");
  };

  //   ADMIN SET ACCESS
  setUserAccess = (adminId, userId, newAccess) => {
    const userIndex = Validator.validateAdminAndUser(
      adminId,
      userId,
      this.userList
    );

    this.userList[userIndex].setAccess(newAccess);
    console.log(`Access changed successfully to: ${newAccess}`);

    console.log("VALIDATED OK");
  };
}

// *********************************************************
// *********************** VALIDATOR ***********************
// *********************************************************

class Validator {
  constructor() {}

  //   FIND USER BY ID
  //   ********
  static findUserById = (array, id) => {
    const lookupArray = array.slice(0);

    return lookupArray.findIndex((el) => el.id === id);
  };

  //   CHECK IF ADMIN
  //   ********
  static isAdmin = (array, id) => {
    const user = this.findUserById(array, id);

    if (user < 0) return false;
    return array[user].access === "admin";
  };

  // VALIDATE IF PROVIDED ADMINID HAS ADMIN ACCESS, AND VALIDATE USER
  static validateAdminAndUser = (adminId, userId, array) => {
    // Checks whether supplied adminId has admin privileges,
    // checks if supplied user exists
    // if user exists the function returns user index
    if (!this.isAdmin(array, adminId)) {
      throw new Error("Invalid admin access");
    }
    const userIndex = this.findUserById(array, userId);

    if (userIndex < 0) {
      throw new Error("User not found");
    }

    return userIndex;
  };

  // VALIDATE NEW USER OBJECT
  static ValidateUser = (userObj) => {
    const { name, surname, email, password, dob } = userObj;

    // Validate Name
    if (typeof name !== "string" || name.length <= 0) {
      throw new Error("Invalid User Name Provided");
    }
    // Validate Surname
    if (typeof surname !== "string" || surname.length <= 0) {
      throw new Error("Invalid User Surname Provided");
    }
    // Validate Email
    if (!validateEmail(email)) {
      throw new Error("Invalid User Email Provided");
    }
    // Validate Password
    const passwordPattern =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/;

    if (!passwordPattern.test(password)) {
      throw new Error("Invalid User Password Provided");
    }
    // Validate DOB
    const dobType = Object.prototype.toString.call(dob);

    console.log(dobType);
    if (dobType !== "[object String]" && dobType !== "[object Date]") {
      throw new Error("Invalid User Date Format");
    }
  };
}

// Helper functions
const idGenerator = () => {
  const numberId =
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36);
  return numberId;
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const formatBirthDate = (dob) => {
  let birthDate;
  const typeOfDob = Object.prototype.toString.call(dob);
  // Validate input data type and assign birth year as string
  if (typeOfDob === "[object String]") {
    birthDate = new Date(dob);
  } else if (typeOfDob === "[object Date]") {
    birthDate = dob;
  } else throw new Error("Incorrect input type");

  // birthDate = new Date(birthDate);
  const formattedBirthDate = `${
    birthDate.getMonth() + 1
  }/${birthDate.getDate()}/${birthDate.getFullYear()}`;
  return formattedBirthDate;
};

// *********************************************************
// *********************** TESTING *************************
// *********************************************************

const _n = {
  name: "TESTER",
  surname: "WAYNE",
  dob: "1 JAN 2021",
  password: "asdF1asdsadf?",
  email: "test1@gmail.com",
  access: "normal",
};

const _n2 = {
  name: "test2",
  surname: "test2",
  dob: "test2",
  password: "test2",
  email: "test2",
  access: "normal",
};

const _a = {
  name: "test1",
  surname: "test1",
  dob: "test1",
  password: "test1",
  email: "test1",
  access: "normal",
};

const app = new App();
app.createUser(_n, "normal");
console.log(app);

const normal = new User(_n, "normal", "123");
const normal2 = new User(_n2, "normal", "333");

const admin = new User(_n, "admin", "666");

app.userList.push(normal);
app.userList.push(normal2);
app.userList.push(admin);

app.createUser(_n, "normal");

console.log(app);

// *********************************************************
// *********************** APP ACTIONS TESTING *************
// *********************************************************

console.log("********** START APP ACTIONS ****************");

app.setUserPassword("666", "333", "NEWPASS-OVERWRITE");
app.setUserEmail("666", "333", "NEWEMAIL-OVERWRITE");
app.setUserAccess("666", "333", "NEWACCESS-OVERWRITE");

console.log(app);
