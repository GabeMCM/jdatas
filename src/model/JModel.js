import File from "../fs/file.js";
import ID from "../id/id.js";
import JSchema from "../schema/JSchema.js";

export default class JModel {
  constructor(name, directory, cod = null, objSchema) {
    this.path = `${this.directory}/${name}.json`;
    this.name = name;
    this.file = new File(this.directory, name);
    this.jschema = new JSchema(objSchema);
    this.id = ID;
    this.cod = cod;
  }

  save(data = {}, id = null) {
    return new Promise(async (resolve, reject) => {
      try {
        const schema = await this.jschema.validate(data);
        await schema.validate(data).then((result) => {
          console.log("fora do try");
        }).catch((error) => {
          
        })
        
        try {
          console.log("entrou no try");
          const id_ = await this.id(this.cod);
          try {
            await this.file.check();
            if (!id) {
              await this.file.update(data);
              resolve(`Object updated!`);
            } else {
              await this.file.update({ [id]: data });
              resolve(`Object ${id} updated!`);
            }
          } catch (error) {
            if (!id) {
              await this.file.create({ [id_]: data });
              resolve(`Object ${id_} created!`);
            } else {
              await this.file.create({ [id]: data });
              resolve(`Object ${id} created!`);
            }
          }
        } catch (error) {
          reject({ error });
        }
      } catch (error) {
        reject({ error });
      }
    });
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.file.read();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAll(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.getAll();
        let result = {};
        for (const key in data) {
          for (const valor in data[key]) {
            if (obj.hasOwnProperty(valor)) {
              if (obj[valor] === data[key][valor]) {
                result[key] = data[key];
              }
            }
          }
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  findExactly(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.getAll();
        let result = {};
        for (const key in data) {
          let match = true;
          for (const prop in obj) {
            if (data[key][prop] !== obj[prop]) {
              match = false;
              break;
            }
          }
          if (match) {
            result[key] = data[key];
          }
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  getId(obj, list = "all") {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.findExactly(obj);
        const listId = [];
        if (list !== "all") {
          for (const id in data) {
            resolve(id);
          }
        } else {
          for (const id in data) {
            listId.push(id);
          }
          resolve(listId);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
