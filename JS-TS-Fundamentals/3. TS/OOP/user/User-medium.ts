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

interface IUser {
  id: string;
  name: string;
  surname: string;
  dob: string | Date;
  password: string;
  email: string;
  access: string;
}

interface adminAndUser {
  admin: User | string;
  user: User | string;
}

class User implements IUser {
  id: string;
  name: string;
  surname: string;
  dob: string | Date;
  password: string;
  email: string;
  access: string;

  constructor(user: IUser, access: string, id = "") {
    this.id = id;
    this.name = user.name;
    this.surname = user.surname;
    this.dob = formatBirthDate(user.dob);
    this.password = user.password;
    this.email = user.email;
    this.access = access;
  }

  setPassword = (newPassword: string) => {
    this.password = newPassword;
  };

  setEmail = (newEmail: string) => {
    this.email = newEmail;
  };

  setAccess = (access: string) => {
    this.access = access;
  };
}
// *********************************************************
// *********************** APP *****************************
// *********************************************************

class App {
  private static instance: App;

  static _userList: User[] = [];
  // static _instance = null;

  private constructor() {}

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }

    // this.instance??
    return App.instance;
  }

  // returns undefined?
  // static getInstance() {
  //   if (this._instance === null) {
  //     this._instance = new App();
  //   }
  //   return this._instance;
  // }

  // Liscov
  static addUser = (user: User) => {
    // czy uuid nie jest zajęte
    this._userList.push(user);
  };

  static createUser = (userObj: IUser, access: string) => {
    let newUser = new User(userObj, access, idGenerator());
    this._userList.push(newUser);
  };

  static createAdmin = (userObj: IUser) => {
    this.createUser(userObj, "admin");
  };

  static _getAdminAndUser(adminId: string, userId: string) {
    const clonedArray = this._userList.slice(0);

    const adminAndUser = clonedArray.reduce(
      (acc: adminAndUser, curr, i, arr) => {
        console.log("CURR ACCESS");
        console.log(curr.access);

        // Check for admin or user
        if (curr.id === adminId && curr.access === "admin") {
          acc["admin"] = curr;
        } else if (curr.id === userId && curr.access === "normal") {
          acc["user"] = curr;
        }

        // Check if all found - early break
        if (acc.admin !== "" && acc.user !== "") {
          arr.splice(1);
        }
        return acc;
      },

      { admin: "", user: "" }
    );

    // Valide admin and user found
    if (adminAndUser.admin == "") {
      throw new Error("Invalid Admin Provided");
    } else if (adminAndUser.user == "") {
      throw new Error("Invalid User Provided");
    }

    return adminAndUser;
  }
  // _checkAdmin(adminId) {
  //   const user = this._userList.find((el) => el.id === adminId);

  //   if (typeof user === "undefined" || user.access !== "admin") return false;

  //   return true;
  // }

  //   ADMIN SET PASSWORD
  static setUserPassword = (
    adminId: string,
    userId: string,
    newPass: string
  ) => {
    // TODO

    // return user

    // reduce => jak zbreakować reduce

    // OLD CODE
    // const user = Validator.validateAdminAndUser(
    //   adminId,
    //   userId,
    //   this._userList
    // );

    // this._userList[user].setPassword(newPass);
    // console.log(`Password changed successfully to: ${newPass}`);
    // console.log("VALIDATED OK");

    const user = this._getAdminAndUser(adminId, userId).user;

    if (user instanceof User) {
      user.setPassword(newPass);
    }

    // this._getAdminAndUser(adminId, userId).user.setPassword(newPass:string);

    // EVEN OLDER CODE

    // if (!Validator.isAdmin(this._userList, adminId)) {
    //   throw new Error("Invalid admin access");
    // }
    // const userIndex = Validator.findUserById(this._userList, userId);

    // if (userIndex > 0) {
    //   this._userList[userIndex].setPassword(newPass);
    //   console.log(`Password changed successfully to: ${newPass}`);
    //   return true;
    // }

    // throw new Error("User not found");
  };

  //   ADMIN SET EMAIL
  static setUserEmail = (adminId: string, userId: string, newEmail: string) => {
    // OLD SOLUTION

    // const userIndex = Validator.validateAdminAndUser(
    //   adminId,
    //   userId,
    //   this._userList
    // );

    // this._userList[userIndex].setEmail(newEmail);
    // console.log(`Email changed successfully to: ${newEmail}`);

    // console.log("VALIDATED OK");

    const user = this._getAdminAndUser(adminId, userId).user;

    if (user instanceof User) {
      user.setPassword(newEmail);
    }

    // this._getAdminAndUser(adminId, userId).user.setEmail(newEmail);
  };

  //   ADMIN SET ACCESS
  static setUserAccess = (
    adminId: string,
    userId: string,
    newAccess: string
  ) => {
    // const user = Validator.validateAdminAndUser(
    //   adminId,
    //   userId,
    //   this._userList
    // );

    // console.log(user);

    // this._userList[user].setAccess(newAccess);
    // console.log(`Access changed successfully to: ${newAccess}`);

    // console.log("VALIDATED OK");

    const user = this._getAdminAndUser(adminId, userId).user;

    if (user instanceof User) {
      user.setPassword(newAccess);
    }

    // this._getAdminAndUser(adminId, userId).user.setAccess(newAccess);
  };
}

// App.getInstance().setUserAccess();

// *********************************************************
// *********************** VALIDATOR ***********************
// *********************************************************

// class Validator {
//   constructor() {}

//   //   FIND USER BY ID
//   //   ********
//   static findByIdInArray = (array, id) => {
//     const lookupArray = array.slice(0);

//     return lookupArray.findIndex((el) => el.id === id);
//   };

//   //   CHECK IF ADMIN
//   //   ********
//   static isAdmin = (array, id) => {
//     const user = this.findByIdInArray(array, id);

//     if (user < 0) return false;
//     return array[user].access === "admin";
//   };

//   // OLD ADMIN AND USER VALIDATION
//   // // VALIDATE IF PROVIDED ADMINID HAS ADMIN ACCESS, AND VALIDATE USER
//   // static validateAdminAndUser = (adminId, userId, array) => {
//   //   // Checks whether supplied adminId has admin privileges,
//   //   // checks if supplied user exists
//   //   // if user exists the function returns user index
//   //   if (!this.isAdmin(array, adminId)) {
//   //     throw new Error("Invalid admin access");
//   //   }
//   //   const userIndex = this.findByIdInArray(array, userId);

//   //   if (userIndex < 0) {
//   //     throw new Error("User not found");
//   //   }

//   //   return userIndex;
//   // };

//   // VALIDATE NEW USER OBJECT
//   static ValidateUser = (userObj) => {
//     const { name, surname, email, password, dob } = userObj;

//     // Validate Name
//     if (typeof name !== "string" || name.length <= 0) {
//       throw new Error("Invalid User Name Provided");
//     }
//     // Validate Surname
//     if (typeof surname !== "string" || surname.length <= 0) {
//       throw new Error("Invalid User Surname Provided");
//     }
//     // Validate Email
//     if (!validateEmail(email)) {
//       throw new Error("Invalid User Email Provided");
//     }
//     // Validate Password
//     console.log(password);
//     const passwordPattern =
//       /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/;

//     console.log(!passwordPattern.test(password));

//     if (!passwordPattern.test(password)) {
//       throw new Error("Invalid User Password Provided");
//     }
//     // Validate DOB
//     const dobType = Object.prototype.toString.call(dob);

//     console.log(dobType);
//     if (dobType !== "[object String]" && dobType !== "[object Date]") {
//       throw new Error("Invalid User Date Format");
//     }
//   };
// }

// Helper functions
const idGenerator = () => {
  const numberId =
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36);
  return numberId;
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const formatBirthDate = (dob: Date | String) => {
  let birthDate: Date = new Date();

  // Validate input data type and assign birth year as string
  if (typeof dob === "string") {
    birthDate = new Date(dob);
  } else if (dob instanceof Date) {
    birthDate = dob;
  }

  // birthDate = new Date(birthDate);
  const formattedBirthDate = `${
    birthDate.getMonth() + 1
  }/${birthDate.getDate()}/${birthDate.getFullYear()}`;
  return formattedBirthDate;
};

// // *********************************************************
// // *********************** TESTING *************************
// // *********************************************************

// const _n = {
//   name: "TESTER",
//   surname: "WAYNE",
//   dob: "1 JAN 2021",
//   password: "asdF1asdsadf?",
//   email: "test1@gmail.com",
//   access: "normal",
// };

// const _n2 = {
//   name: "test2",
//   surname: "test2",
//   dob: "1/20/2022",
//   password: "asdF1asdsadf?",
//   email: "test2@gmail.com",
//   access: "normal",
// };

// const _a = {
//   name: "test1",
//   surname: "test1",
//   dob: "19/12/1990",
//   password: "asdF1asdsadf?",
//   email: "test3@gmail.com",
//   access: "normal",
// };

// const app = App.getInstance();
// // console.log(app);
// // app.createUser(_n, "normal");
// // App.getInstance().createUser(_n, "normal");

// console.log(app);

// console.log("STAGE 1");

// const normal = new User(_n, "normal", "123");
// const normal2 = new User(_n2, "normal", "333");

// const admin = new User(_n, "admin", "666");

// app._userList.push(normal);
// app._userList.push(normal2);
// app._userList.push(admin);

// app.createUser(_n, "normal");

// console.log(app);

// // *********************************************************
// // *********************** APP ACTIONS TESTING *************
// // *********************************************************

// console.log("********** START APP ACTIONS ****************");

// app.setUserPassword("666", "333", "asdF1asdsadf-OVERWRITE");
// app.setUserEmail("666", "333", "NEWEMAIL-OVERWRITE");
// app.setUserAccess("666", "333", "NEWACCESS-OVERWRITE");

// console.log(app);

// // console.log(app._checkAdmin("666"));

// const testadminuser = app._getAdminAndUser("666", "123");

// console.log("GETADMINUSER RESULT: ");
// console.log(testadminuser);
// console.log(typeof testadminuser);

// console.log(testadminuser.admin.id);

// // console.log(app._getAdminAndUser("666", "333"));
