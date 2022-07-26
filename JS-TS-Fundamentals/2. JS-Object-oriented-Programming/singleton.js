class ABC {
  static _instance;

  static getInstance() {
    if (this._instance === undefined) {
      this._instance = new ABC();
      return this._instance;
    }
    return this._instance;
  }

  hello() {
    console.log("hehe");
  }
}

ABC.getInstance().hello();
