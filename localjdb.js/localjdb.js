// Função JDB que representa um objeto com funções para criação de modelos e esquemas.
// JDB function representing an object with functions for creating models and schemas.

import JModel from "../model/JModel.js";

const JDB = (directory) => {
  // Função que representa um esquema de validação de dados.
  // Function representing a data validation schema.
  const Schema = (obj) => {
    return obj;
  };

  // Função que representa um modelo de dados.
  // Function representing a data model.
  const Model = (name, object, cod) => {
    // Retorna uma nova instância de JModel com os parâmetros fornecidos.
    // Return a new instance of JModel with the provided parameters.
    return new JModel(name, directory, object, cod);
  };

  // Retorna um objeto contendo as funções de criação de modelos e esquemas.
  // Return an object containing the functions for creating models and schemas.
  return {
    Model,
    Schema,
  };
};

export default JDB;
