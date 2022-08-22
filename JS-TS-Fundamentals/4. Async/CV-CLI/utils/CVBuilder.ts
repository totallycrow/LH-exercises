import * as utils from "../utils/utils.js";

const conf = new (require("conf"))();

// ****************** MAIN ******************

export default class CvBuilder {
  name: string;
  surname: string;
  email: string;
  about: string;
  edu: string;
  skills: Array<utils.ISkill>;
  image: string;
  sendTo: Array<string>;
  template: string;

  constructor() {
    this.name = conf.get("name");
    this.surname = conf.get("surname");
    this.email = conf.get("email");
    this.about = conf.get("about");
    this.edu = conf.get("edu");
    this.skills = conf.get("skills");
    this.image = conf.get("image");
    this.sendTo = conf.get("sendTo");
    this.template = conf.get("template");
  }

  // ********** SETTERS **********

  setName = (aName: string) => {
    this.name = aName;
    conf.set("name", aName);
  };
  setSurname = (aSurname: string) => {
    this.surname = aSurname;
    conf.set("surname", aSurname);
  };

  setEmail = (anEmail: string) => {
    this.email = anEmail;
    conf.set("email", anEmail);
  };
  setAbout = (data: string) => {
    this.about = data;
    conf.set("about", data);
  };

  // ********** HANDLERS **********

  handlePersonals = (data: string) => {
    const values = data.split(" ");
    if (values.length !== 3) throw new Error("Invalid details supplied");

    this.setName(values[0]);
    this.setSurname(values[1]);
    this.setEmail(values[2]);
  };
  handleAbout = async (filepath: string) => {
    try {
      const data = await utils.reader(filepath);
      console.log(data);
      this.setAbout(data);
    } catch (err) {
      console.log(err);
    }
  };
  handleEdu = async (filepath: string) => {
    try {
      const data = await utils.reader(filepath);
      console.log(data);
      this.edu = data;
      conf.set("edu", data);
    } catch (err) {
      console.log(err);
    }
  };

  handleSkills = (data: string) => {
    if (typeof this.skills === "undefined") {
      this.skills = [];
    }
    const dataSplit = data.split(" ");
    const skillsList = [];

    // VALIDATE
    if (dataSplit.length % 2 !== 0) throw new Error("Incorrect input");

    for (let i = 0; i < dataSplit.length; i = i + 2) {
      const name = dataSplit[i];
      const proficiency = parseInt(dataSplit[i + 1]);

      const skillItem = new utils.Skill(name, proficiency);
      skillsList.push(skillItem);
    }
    this.skills = skillsList;
    conf.set("skills", this.skills);
  };

  handleImage = (data: string) => {
    this.image = data;
    conf.set("image", data);
  };

  handleEmails = (emails: string) => {
    const emailsList = emails.split(" ");

    // Validate
    emailsList.forEach((email) => {
      if (!email.includes("@")) throw new Error("Invald email");
    });

    this.sendTo = emailsList;
    conf.set("sendTo", emailsList);

    const mockURL = "MOCKURL";
    this.sendEmail(emailsList, mockURL);
  };

  handleTemplate = (data: string) => {
    this.template = data;
    conf.set("template", data);
  };

  composeMessage = () => {
    if (this.template) {
      // MOCK? USE TEMPLATE / REPLACE VALUES
      return this.template;
    }

    return `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title>${this.name} ${this.surname} CV </title>

  <style type="text/css">
  </style>    
</head>
<body style="margin:0; padding:0; background-color:#F2F2F2;">
  <center>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2">
        <tr>
            <td align="center" valign="top">
            ${this.name}
            ${this.surname}
            ${this.email}
            ${this.about}
            ${this.edu}
            ${this.skills}
            ${this.image}     
            </td>
        </tr>
    </table>
  </center>
</body>
</html>
    `;
  };

  sendEmail = (emails: string[], url: string) => {
    // MOCK?
    console.log(JSON.stringify(emails));
    console.log(url);
    const msg = this.composeMessage();
  };

  resetData = () => {
    this.name = "";
    this.surname = "";
    this.email = "";
    this.about = "";
    this.edu = "";
    this.skills = [];
    this.image = "";
    this.sendTo = [];

    conf.set("name", "");
    conf.set("surname", "");
    conf.set("email", "");
    conf.set("about", "");
    conf.set("edu", "");
    conf.set("skills", []);
    conf.set("image", "");
    conf.set("sendTo", []);
  };
}
