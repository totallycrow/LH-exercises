import * as fs from "fs";

const { program } = require("commander");
const conf = new (require("conf"))();

// INTERFACES

export interface ISkill {
  skillName: string;
  skillValue: string;
  setSkillValue(s: number): void;
}

// UTILITIES

export class Skill implements ISkill {
  skillName: string;
  skillValue: string;

  constructor(aName: string, value: number) {
    this.skillName = aName;
    this.skillValue = "*".repeat(value);
  }
  setSkillValue = (skill: number) => {
    this.skillValue = "*".repeat(skill);
  };
}

export const reader = (FILE: string): string => {
  try {
    console.log(FILE);
    let obj = fs.readFileSync(FILE, "utf8");
    console.log(obj);
    return obj;
  } catch (err) {
    return String(err);
  }
};
