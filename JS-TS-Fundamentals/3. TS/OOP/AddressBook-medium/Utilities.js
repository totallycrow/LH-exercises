import Validator from "./Validator.js";

export default class Utilities {
  constructor() {}

  static idGenerator = () => {
    const numberId =
      Date.now().toString(36) +
      Math.floor(
        Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
      ).toString(36);
    return numberId;
  };

  static addItemToArray = (item, array) => {
    if (Validator.findByIdInArray(array, item.id))
      throw new Error("Contact already in the list");

    array.push(item);
    
  };
}
