// Classe JModel representa um modelo de dados que inclui funcionalidades para validação e manipulação dos dados.
// JModel class represents a data model that includes functionalities for data validation and manipulation.

import File from "../fs/file.js";
import ID from "../id/id.js";
import JSchema from "../schema/JSchema.js";

export default class JModel {
  // Construtor da classe JModel que inicializa os atributos da instância.
  // Constructor of the JModel class that initializes the instance attributes.
  constructor(name, directory, objSchema, cod = directory) {
    this.name = name;
    this.file = new File(directory, name);
    this.jschema = new JSchema(objSchema);
    this.id = ID;
    this.cod = cod;
    this.objSchema = objSchema;
  }

  // Função assíncrona para salvar os dados no arquivo de acordo com o esquema de validação.
  // Asynchronous function to save data to the file according to the validation schema.
  async save(data = {}, id = null, log = true) {
    const print = (message) => {
      if (log) {
        console.log(message)
      }
    }

    try {
      if (this.objSchema !== null) {
        await this.jschema.validate(data);
      }
      
      const id_ = await this.id(this.cod);

      try {
        await this.file.checkOrCreateFolder();
        await this.file.check();

        if (!id) {
          try {
            await this.file.update({ [id_]: data });
            print(`Update data: ${id_}`);
          } catch (error) {
            print({ error: error });
          }
        } else {
          try {
            await this.file.update({ [id]: data });
            print(`Update data: ${id}`);
          } catch (error) {
            print({ error: error });
          }
        }
      } catch (error) {
        if (!id) {
          try {
            await this.file.create({ [id_]: data });
            print(`Create data: ${id_}`);
          } catch (error) {
            print({ error: error });
          }
        } else {
          try {
            await this.file.create({ [id]: data });
            print(`Create data: ${id}`);
          } catch (error) {
            print({ error: error });
          }
        }
      }
    } catch (error) {
      console.error({ error: error });
    }
  }

  // Função assíncrona para obter todos os dados do arquivo.
  // Asynchronous function to get all data from the file.
  async getAll() {
    try {
      const data = await this.file.read();
      return data;
    } catch (error) {
      console.error({ error: error });
    }
  }

  // Função assíncrona para encontrar dados que correspondem ao objeto fornecido.
  // Asynchronous function to find data that matches the provided object.
  async findAll(obj) {
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
      return result;
    } catch (error) {
      console.error({ error: error });
    }
  }

  // Função assíncrona para encontrar exatamente dados que correspondem ao objeto fornecido.
  // Asynchronous function to find exactly data that matches the provided object.
  async findExactly(obj) {
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
      return result;
    } catch (error) {
      console.error({ error: error });
    }
  }

  // Função assíncrona para obter o ID dos dados que correspondem ao objeto fornecido.
  // Asynchronous function to get the ID of data that matches the provided object.
  async getId(obj, search = "all") {
    try {
      const data = await this.findExactly(obj);
      const listId = [];
      if (search !== "all") {
        for (const id in data) {
          return id;
        }
      } else {
        for (const id in data) {
          listId.push(id);
        }
        return listId;
      }
    } catch (error) {
      console.error({ error: error });
    }
  }

  // Função assíncrona para encontrar dados pelo ID.
  // Asynchronous function to find data by ID.
  async findById(id, result = "complete") {
    try {
      const data = await this.getAll();
      for (const key in data) {
        if (key === id && result !== "complete") {
          return data[key];
        } else if (key === id && result === "complete") {
          return { [key]: data[key] };
        }
      }

      throw new Error(`ID \x1b[31m\x1b[1m${id}\x1b[0m not found`);
    } catch (error) {
      console.error(error);
    }
  }

  // Função assíncrona para excluir dados pelo ID.
  // Asynchronous function to delete data by ID.
  async deleteById(idToDel) {
    const deleted = async (id) => {
      const idFounded = await this.findById(id, "complete");
      const allData = await this.getAll();
      for (const key in allData) {
        if (idFounded.hasOwnProperty(key)) {
          delete allData[key];
          return allData;
        }
      }

      throw new Error(`ID \x1b[31m\x1b[1m${id}\x1b[0m not found`);
    };
    try {
      const result = await deleted(idToDel);
      try {
        await this.file.create(result);
      } catch (error) {
        console.error(error);
      }
      console.log(`The data ID: '\x1b[32m\x1b[1m${idToDel}\x1b[0m' has deleted with successfully`);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAllData() {
    try {
      const data = await this.getAll();
      for(const id in data) {
        await this.deleteById(id)
      }
    } catch (error) {
      console.error(error);
    }
  }
}
