export default class Schema {
  constructor(obj) {
    this.obj = obj;
  }

  validate(data) {
    return new Promise((resolve, reject) => {
      if (!data || typeof data !== "object") {
        reject("Data must be an object.");
      }

      for (const prop in data) {
        const expectedType = this.obj[prop];
        const actualValue = data[prop];
        const actualType = Object.prototype.toString.call(actualValue);

        if (this.obj.hasOwnProperty(prop)) {
          if (actualType !== `[object ${expectedType.name}]`) {
            reject(
              `Invalid data type for field "${prop}". Expected "${expectedType.name}".`
            );
          } 
        } else {
          reject(`Property not defined "${prop}".`);
        }
      }

      resolve();
    });
  }
}
