import File from '../fs/file.js';

export default class Model {
	constructor(name, directory) {
		this.path = `${directory}/${name}.json`;
		this.name = name;
		this.file = new File(directory, name);
	}

	getAll() {
		return new Promise( async (resolve, reject) => {
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
	
	
}
