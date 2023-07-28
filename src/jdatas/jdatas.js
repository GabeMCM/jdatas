// Função JDB que representa um objeto com funções para criação de modelos e esquemas.
// JDB function representing an object with functions for creating models and schemas.

import JModel from "../model/JModel.js";

const Jdatas = (directory) => {
  // Função que representa um esquema de validação de dados.
  // Function representing a data validation schema.
  const schema = (obj) => {
    return obj;
  };

  // Função que representa um modelo de dados.
  // Function representing a data model.
  const model = (name, object, cod) => {
    return new JModel(name, directory, object, cod);
  };

  return {
    model,
    schema,
  };
};

export default Jdatas;
