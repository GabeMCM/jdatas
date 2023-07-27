import JModel from "../model/JModel.js"

export default class JDB {
  constructor () {

  }

  JData (directory) {
    return {
      JDModel: (name, object, cod = 0) => {
        return new JModel(name, directory, object, cod)
      }, 

      JDSchema: (Object) => {
        return Object;
      },
    };
  }
}

