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

type TSetter = (value: string) => void;

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

// *** CLASS ***
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

  setPassword: TSetter = (newPassword: string) => {
    this.password = newPassword;
  };

  setEmail: TSetter = (newEmail: string) => {
    this.email = newEmail;
  };

  setAccess: TSetter = (access: string) => {
    this.access = access;
  };
}
// *********************************************************
// *********************** APP *****************************
// *********************************************************

class App {
  private static instance: App;
  static _userList: User[] = [];

  private constructor() {}

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }

    // no this.instance??
    return App.instance;
  }

  static addUser = (user: User): void => {
    if (this._userList.find((el) => el.id === user.id))
      throw new Error("User already in the list");

    this._userList.push(user);
  };

  static createUser = (userObj: IUser, access: string): void => {
    const newUser = new User(userObj, access, idGenerator());
    this._userList.push(newUser);
  };

  static createAdmin = (userObj: IUser): void => {
    this.createUser(userObj, "admin");
  };

  static _getAdminAndUser(adminId: string, userId: string): adminAndUser {
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

  //   ADMIN SET PASSWORD
  static setUserPassword = (
    adminId: string,
    userId: string,
    newPass: string
  ) => {
    const user = this._getAdminAndUser(adminId, userId).user;

    if (user instanceof User) {
      user.setPassword(newPass);
    }
  };

  //   ADMIN SET EMAIL
  static setUserEmail = (adminId: string, userId: string, newEmail: string) => {
    const user = this._getAdminAndUser(adminId, userId).user;

    if (user instanceof User) {
      user.setPassword(newEmail);
    }
  };

  //   ADMIN SET ACCESS
  static setUserAccess = (
    adminId: string,
    userId: string,
    newAccess: string
  ) => {
    const user = this._getAdminAndUser(adminId, userId).user;

    if (user instanceof User) {
      user.setPassword(newAccess);
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
