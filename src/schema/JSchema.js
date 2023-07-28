// Classe que representa um esquema de validação de dados.
// Class representing a data validation schema.

export default class JSchema {
  constructor(obj) {
    // Objeto que define os tipos esperados para cada propriedade dos dados.
    // Object that defines the expected types for each property of the data.
    this.obj = obj;
  }

  // Método para validar os dados fornecidos de acordo com o esquema.
  // Method to validate the provided data according to the schema.
  validate(data) {
    return new Promise((resolve, reject) => {
      // Verifica se os dados fornecidos não são nulos (null) ou indefinidos (undefined),
      // e se são do tipo objeto (object).
      // Check if the provided data is not null or undefined,
      // and if it is of type object.
      if (!data || typeof data !== "object") {
        reject("Data must be an object.");
      }

      // Percorre cada propriedade dos dados fornecidos.
      // Iterate over each property of the provided data.
      for (const prop in data) {
        // Obtém o tipo esperado para a propriedade atual.
        // Get the expected type for the current property.
        const expectedType = this.obj[prop];
        // Obtém o valor atual da propriedade.
        // Get the current value of the property.
        const actualValue = data[prop];
        // Obtém o tipo atual da propriedade.
        // Get the current type of the property.
        const actualType = Object.prototype.toString.call(actualValue);

        // Verifica se a propriedade atual está definida no esquema.
        // Check if the current property is defined in the schema.
        if (this.obj.hasOwnProperty(prop)) {
          // Compara o tipo atual com o tipo esperado para a propriedade atual.
          // Compare the current type with the expected type for the current property.
          if (actualType !== `[object ${expectedType.name}]`) {
            reject(
              `Invalid data type for field "${prop}". Expected "${expectedType.name}".`
            );
          }
        } else {
          // Se a propriedade atual não está definida no esquema, rejeita a validação.
          // If the current property is not defined in the schema, reject the validation.
          reject(`Property not defined "${prop}".`);
        }
      }

      // Se a validação for bem-sucedida, resolve a promessa.
      // If the validation is successful, resolve the promise.
      resolve();
    });
  }
}
