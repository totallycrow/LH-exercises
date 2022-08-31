"use strict";
const testSettings = {
    action: "/contact/by-mail",
    method: "POST",
    inputs: [
        { type: "header", label: "Skontaktuj się z nami" },
        { name: "yourEmail", type: "email", placeholder: "Wpisz swój email" },
        {
            name: "content",
            type: "textarea",
            placeholder: "Wpisz treść wiadomości",
        },
        { type: "submit", label: "Wyślij wiadomość" },
    ],
};
class CustomForm {
    formElement;
    constructor(formName) {
        this.formElement = document.createElement("form");
        const mainHeader = document.createElement("h2");
        mainHeader.innerText = formName;
        this.formElement.appendChild(mainHeader);
    }
    setFormMethod = (value) => {
        this.formElement.method = value;
    };
    setFormAction = (action) => {
        this.formElement.action = action;
    };
    setFormHeader = (content) => {
        const secondaryHeader = document.createElement("h4");
        secondaryHeader.innerText = content;
        this.formElement.appendChild(secondaryHeader);
    };
    addFormInput = (type, name, placeholder) => {
        const customInput = document.createElement("input");
        customInput.type = type;
        customInput.name = name;
        customInput.placeholder = placeholder;
        this.formElement.appendChild(customInput);
    };
    addFormTextarea = (name, placeholder) => {
        const customTextarea = document.createElement("textarea");
        customTextarea.name = name;
        customTextarea.placeholder = placeholder;
        this.formElement.appendChild(customTextarea);
    };
    addSubmitButton = (content) => {
        const customButton = document.createElement("button");
        customButton.type = "submit";
        customButton.innerText = content;
        this.formElement.appendChild(customButton);
    };
}
// ********* APP **************
function generateFormOnPattern(settings) {
    const formData = settings.inputs;
    const requiredTypes = ["header", "email", "textarea", "submit"];
    //   SET FORM
    const form = new CustomForm("Form1");
    // BUILD THE FORM
    formData.forEach((el) => {
        // VALIDATE TYPES
        if (!requiredTypes.includes(el.type))
            throw new Error("Invalid Type");
        switch (el.type) {
            case "header":
                if (typeof el.label === "undefined")
                    throw new Error("Invalid data provided");
                form.setFormHeader(el.label);
                break;
            case "email":
                if (typeof el.name === "undefined" ||
                    typeof el.placeholder === "undefined")
                    throw new Error("Invalid data provided");
                form.addFormInput(el.type, el.name, el.placeholder);
                break;
            case "textarea":
                if (typeof el.name === "undefined" ||
                    typeof el.placeholder === "undefined")
                    throw new Error("Invalid data provided");
                form.addFormTextarea(el.name, el.placeholder);
                break;
            case "submit":
                if (typeof el.label === "undefined")
                    throw new Error("Invalid data provided");
                form.addSubmitButton(el.label);
                break;
        }
    });
    form.setFormMethod(settings.method);
    form.setFormAction(settings.action);
    //   TESTING
    const main = document.querySelector(".main-div");
    //   @ts-ignore
    main.appendChild(form.formElement);
    return form.formElement;
}
console.log(generateFormOnPattern(testSettings));
