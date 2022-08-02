"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const Validator_js_1 = require("../Validator.js");
// @ts-ignore
const Utilities_js_1 = __importDefault(require("../Utilities.js"));
// *********************************************************
// *********************** GROUP ****************************
// *********************************************************
class Group {
    constructor(groupName) {
        this.isInGroup = (contact) => {
            Validator_js_1.Validator.validateContact(contact);
            return Validator_js_1.Validator.findByIdInArray(this.groupContactList, contact);
        };
        this.setName = (groupName) => {
            Validator_js_1.Validator.validateString(groupName);
            this.name = groupName;
        };
        this.addContact = (contactId) => {
            Validator_js_1.Validator.validateContact(contactId);
            if (this.isInGroup(contactId))
                throw new Error("Contact already exists in the group");
            this.groupContactList.push(contactId);
        };
        this.removeContact = (contactId) => {
            if (!this.isInGroup) {
                throw new Error("User not found");
            }
            this.groupContactList = this.groupContactList.filter((el) => el !== contactId);
        };
        this.cleanGroupList = () => (this.groupContactList = []);
        Validator_js_1.Validator.validateString(groupName);
        this.id = Utilities_js_1.default.idGenerator();
        this.name = groupName;
        this.groupContactList = [];
    }
}
exports.default = Group;
