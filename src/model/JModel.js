import File from "../fs/file.js";
import ID from "../id/id.js";
import JSchema from "../schema/JSchema.js";

export default class JModel {
	constructor(name, directory, objSchema, cod = 0) {
		this.name = name;
		this.file = new File(directory, name);
		this.jschema = new JSchema(objSchema);
		this.id = ID;
		this.cod = cod;
		this.objSchema = objSchema;
	}

	async save(data = {}, id = null) {
		try {
			await this.jschema.validate(data);
			const id_ = await this.id(this.cod);

			try {
				await this.file.check();

				if (!id) {
					try {
						await this.file.update({ [id_]: data });
						console.log(`Update data: ${id_}`);
					} catch (error) {
						console.log({ error: error });
					}
				} else {
					try {
						await this.file.update({ [id]: data });
						console.log(`Update data: ${id}`);
					} catch (error) {
						console.log({ error: error });
					}
				}
			} catch (error) {
				if (!id) {
					try {
						await this.file.create({ [id_]: data });
						console.log(`Create data: ${id_}`);
					} catch (error) {
						console.log({ error: error });
					}
				} else {
					try {
						await this.file.create({ [id]: data });
						console.log(`Create data: ${id}`);
					} catch (error) {
						console.log({ error: error });
					}
				}
			}
		} catch (error) {
			console.error({ error: error });
		}
	}

	async getAll() {
		try {
			const data = await this.file.read();
			return data;
		} catch (error) {
			console.error({ error: error });
		}
	}

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
    }
		try {
      const result = await deleted(idToDel)
      try {
        await this.file.create(result)
      } catch (error) {
        console.error(error)
      }
      console.log(`The data ID: '\x1b[32m\x1b[1m${idToDel}\x1b[0m' has deleted with successfully`)
		} catch (error) {
      console.error(error)
    }
	}
}
