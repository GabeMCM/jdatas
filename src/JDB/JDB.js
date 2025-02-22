// Função JDB que representa um objeto com funções para criação de modelos e esquemas.
// JDB function representing an object with functions for creating models and schemas.

import JModel from "../model/JModel.js";

class Jdatas {
  constructor(directory){
    this.directory = directory
  }
 
  // Função que representa um modelo de dados.
  // Function representing a data model.
  model = (name, objectSchema, cod) => {
    return new JModel(name, this.directory, objectSchema, cod);
  }
}


export default Jdatas;
