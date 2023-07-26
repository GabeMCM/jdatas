import JModel from "../model/JModel.js"

export default class JDB {
  constructor () {

  }

  JData (directory) {
    return {
      JDModel: (name, cod = null, object) => {
        return new JModel(name, directory, cod, object)
      }, 

      JDSchema: (Object) => {
        return Object;
      },
    };
  }
}

