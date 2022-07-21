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
// - płeć musi być ze zbioru [male, female]
// - data (nieważne jaka wejdzie) do konstruktora musi wejść w formacie MM/DD/YYYY
// - imię i nazwisko musi być niepuste

// *********************************************************
// *********************** USER ***********************
// *********************************************************

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
// *********************** APP ***********************
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
  // listOfUsers
  // createUser(...)
  // createAdmin(...)
  // wszystkie metody w których admin ingeruje we właściwości innych użytkowników

  createUser = (userObj, access) => {
    const newUser = new User(userObj, access, idGenerator());
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
    if (!Validator.isAdmin(this.userList, adminId)) {
      throw new Error("Invalid admin access");
    }
    const userIndex = Validator.findUserById(this.userList, userId);

    if (userIndex > 0) {
      this.userList[userIndex].setEmail(newEmail);
      console.log(`Email changed successfully to: ${newEmail}`);
      return true;
    }
    throw new Error("User not found");
  };

  //   ADMIN SET ACCESS
  setUserAccess = (adminId, userId, newAccess) => {
    if (!Validator.isAdmin(this.userList, adminId)) {
      throw new Error("Invalid admin access");
    }
    const userIndex = Validator.findUserById(this.userList, userId);

    if (userIndex > 0) {
      this.userList[userIndex].setAccess(newAccess);
      console.log(`Email changed successfully to: ${newAccess}`);
      return true;
    }
    throw new Error("User not found");
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

// *********************************************************
// *********************** TESTING ***********************
// *********************************************************

const _n = {
  name: "test1",
  surname: "test1",
  dob: "test1",
  password: "test1",
  email: "test1",
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

const normal = new User(_n, "normal", "123");
const normal2 = new User(_n2, "normal", "333");
// console.log(normal);
const admin = new User(_n, "admin", "666");
// console.log(admin);

const app = new App();
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
// app.setUserEmail("666", "333", "NEWEMAIL-OVERWRITE");
// app.setUserAccess("666", "3334", "NEWACCESS-OVERWRITE");

console.log(app);

// const testUserObj = new User(testUser, "admin", "123");
// console.log(testUserObj);
// console.log(testUserObj.constructor);
// console.log(Object.getPrototypeOf(testUserObj));

// testUserObj.setPassword("newPass");
// console.log(testUserObj);

// const app = new App();

// console.log(app.userList);

// app.userList.push(testUserObj);
// console.log(app.userList);

// const app2 = app;

// console.log(app2);

// app.createUser(testUserObj, "user");

// console.log(app2);

// app.createAdmin(testUserObj);

// console.log(app2);

// const user33 = app.userList[2];

// app.setUserPassword(testUserObj, user33, "OVERWRITEPASS");
// console.log(app);

// console.log(Boolean(Validator.findUserById(app.userList, "123")));
// console.log(Validator.findUserById(app.userList, "123"));

// console.log(Validator.isAdmin(app.userList, "666"));
