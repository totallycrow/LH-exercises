"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const Validator_js_1 = __importDefault(require("../Validator.js"));
const group_js_1 = __importDefault(require("./group.js"));
class GroupManager {
    allGroups;
    constructor() {
        this.allGroups = [];
    }
    addToList = (group) => {
        if (Validator_js_1.default.findByIdInArray(this.allGroups, group.id))
            throw new Error("Group already in All Groups list");
        this.allGroups.push(group);
    };
    createNew = (name) => {
        const newGroup = new group_js_1.default(name);
        this.addToList(newGroup);
    };
    setName = (group, newName) => {
        group.setName(newName);
    };
    removeFromList = (group) => {
        Validator_js_1.default.validateGroup(group);
        if (!Validator_js_1.default.findByIdInArray(this.allGroups, group.id))
            throw new Error("Group Not Found in the List");
        this.allGroups = this.allGroups.filter((el) => el.id !== group.id);
    };
    removeContactFromAllGroups = (contactId) => {
        this.allGroups.forEach((group) => group.removeContact(contactId));
    };
}
exports.default = GroupManager;
