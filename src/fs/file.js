import fs from "fs";

export default class File {
  constructor(path, name) {
    this.direct = `${path}/${name}.json`;
  }

  save(data = "[]", encoding = "utf8") {
    const promisse = (resolve, reject) => {
      fs.writeFile(
        this.direct,
        JSON.stringify(data, null, 2),
        encoding,
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
    };
    return new Promise(promisse);
  }

  read(encoding = "utf8") {
    const promisse = (resolve, reject) => {
      fs.readFile(this.direct, encoding, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        try {
          const obj = JSON.parse(data);
          resolve(obj);
        } catch (error) {
          reject(error);
        }
      });
    };
    return new Promise(promisse);
  }

  update(newData) {
    const promisse = async (resolve, reject) => {
      const data = await this.read();
      const finalData = { ...data, ...newData };
      await this.save(finalData);
      resolve(finalData);
    };
    return new Promise(promisse);
  }

  check() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.read();
        if (data !== undefined || data !== null) {
          resolve(true);
        } else {
          reject(false);
        }
      } catch (error) {
        reject(false);
      }
    });
  }
}
