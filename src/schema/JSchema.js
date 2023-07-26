export default class Schema{
	constructor(obj) {
		this.obj = obj;
	}

	validate(data) {
		if (!data || typeof data !== "object") {
			throw new Error("Data must be an object.");
		}

		for (const prop in data) {
			if (this.obj.hasOwnProperty(prop)) {
				const propObj = this.obj[prop];
				const dataValue = data[prop];

				if (propObj === "string" && typeof dataValue !== "string") {
					throw new Error(
						`Invalid data type for prop "${prop}". Expected "string".`
					);
				}

				if (propObj === "number" && typeof dataValue !== "number") {
					throw new Error(
						`Invalid data type for prop "${prop}". Expected "number".`
					);
				}

				if (propObj === "boolean" && typeof dataValue !== "boolean") {
					throw new Error(
						`Invalid data type for prop "${prop}". Expected "boolean".`
					);
				}
			} else {
				throw new Error(`Property not defined "${prop}".`);
			}
		}
	}
}
