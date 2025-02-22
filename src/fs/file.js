// Classe que representa um arquivo de armazenamento em formato JSON.
// Class representing a JSON storage file.

import fs from "fs";

export default class File {
  constructor(path, name) {
    // Caminho completo do arquivo.
    // Full path of the file.
    this.direct = `${path}/${name}.json`;
  }

  // Método para criar um novo arquivo com os dados fornecidos.
  // Method to create a new file with the provided data.
  create(data = {}, encoding = "utf8") {
    const promisse = (resolve, reject) => {
      fs.writeFile(
        this.direct,
        JSON.stringify(data, null, 2),
        encoding,
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
    };
    return new Promise(promisse);
  }

  // Método para ler o conteúdo do arquivo.
  // Method to read the content of the file.
  read(encoding = "utf8") {
    const promisse = (resolve, reject) => {
      fs.readFile(this.direct, encoding, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        try {
          const obj = JSON.parse(data);
          resolve(obj);
        } catch (error) {
          reject(error);
        }
      });
    };
    return new Promise(promisse);
  }

  // Método para atualizar o conteúdo do arquivo com novos dados.
  // Method to update the file content with new data.
  update(newData) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.read();
        const finalData = { ...data, ...newData };
        await this.create(finalData);
        resolve(finalData);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Método para verificar se o arquivo existe e possui conteúdo.
  // Method to check if the file exists and has content.
  check() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.read();
        if (data !== undefined || data !== null) {
          resolve(true);
        } else {
          reject(false);
        }
      } catch (error) {
        reject(false);
      }
    });
  }

  // Verifica a existencia da pasta e cria se for necessário.
  // Verify and create path.
  checkOrCreateFolder() {
    // Extraindo o diretório (a parte do caminho antes do nome do arquivo)
    const folderPath = this.direct.substring(0, this.direct.lastIndexOf('/'));
    return new Promise((resolve, reject) => {
      fs.access(folderPath, fs.constants.F_OK, (err) => {
        if (!err) {
          // A pasta existe
          resolve(true);
        } else {
          // A pasta não existe; tenta criá-la
          fs.mkdir(folderPath, { recursive: true }, (err2) => {
            if (err2) {
              reject(new Error(`Falha ao criar a pasta: ${err2.message}`));
            } else {
              resolve(true);
            }
          });
        }
      });
    });
  }


}
