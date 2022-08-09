"use strict";
// *********************************************************
// *********************** USER ****************************
// *********************************************************
var _a;
// *** CLASS ***
class User {
    constructor(user, access, id = "") {
        this.setPassword = (newPassword) => {
            this.password = newPassword;
        };
        this.setEmail = (newEmail) => {
            this.email = newEmail;
        };
        this.setAccess = (access) => {
            this.access = access;
        };
        this.id = id;
        this.name = user.name;
        this.surname = user.surname;
        this.dob = formatBirthDate(user.dob);
        this.password = user.password;
        this.email = user.email;
        this.access = access;
    }
}
// *********************************************************
// *********************** APP *****************************
// *********************************************************
class App {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new App();
        }
        return this.instance;
    }
    static _getAdminAndUser(adminId, userId) {
        const clonedArray = this._userList.slice(0);
        const adminAndUser = clonedArray.reduce((acc, curr, i, arr) => {
            console.log("CURR ACCESS");
            console.log(curr.access);
            // Check for admin or user
            if (curr.id === adminId && curr.access === "admin") {
                acc["admin"] = curr;
            }
            else if (curr.id === userId && curr.access === "normal") {
                acc["user"] = curr;
            }
            // Check if all found - early break
            if (acc.admin !== "" && acc.user !== "") {
                arr.splice(1);
            }
            return acc;
        }, { admin: "", user: "" });
        // Valide admin and user found
        if (adminAndUser.admin == "") {
            throw new Error("Invalid Admin Provided");
        }
        else if (adminAndUser.user == "") {
            throw new Error("Invalid User Provided");
        }
        return adminAndUser;
    }
}
_a = App;
App._userList = [];
App.addUser = (user) => {
    if (_a._userList.find((el) => el.id === user.id))
        throw new Error("User already in the list");
    _a._userList.push(user);
};
App.createUser = (userObj, access) => {
    const newUser = new User(userObj, access, idGenerator());
    _a._userList.push(newUser);
};
App.createAdmin = (userObj) => {
    _a.createUser(userObj, "admin");
};
//   ADMIN SET PASSWORD
App.setUserPassword = (adminId, userId, newPass) => {
    const user = _a._getAdminAndUser(adminId, userId).user;
    if (user instanceof User) {
        user.setPassword(newPass);
    }
};
//   ADMIN SET EMAIL
App.setUserEmail = (adminId, userId, newEmail) => {
    const user = _a._getAdminAndUser(adminId, userId).user;
    if (user instanceof User) {
        user.setPassword(newEmail);
    }
};
//   ADMIN SET ACCESS
App.setUserAccess = (adminId, userId, newAccess) => {
    const user = _a._getAdminAndUser(adminId, userId).user;
    if (user instanceof User) {
        user.setPassword(newAccess);
    }
};
// Helper functions
const idGenerator = () => {
    const numberId = Date.now().toString(36) +
        Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36);
    return numberId;
};
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
const formatBirthDate = (dob) => {
    let birthDate = new Date();
    // Validate input data type and assign birth year as string
    if (typeof dob === "string") {
        birthDate = new Date(dob);
    }
    else if (dob instanceof Date) {
        birthDate = dob;
    }
    // birthDate = new Date(birthDate);
    const formattedBirthDate = `${birthDate.getMonth() + 1}/${birthDate.getDate()}/${birthDate.getFullYear()}`;
    return formattedBirthDate;
};
