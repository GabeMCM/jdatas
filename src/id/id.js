// Função assíncrona para gerar um novo ID com base em um código opcional e na data e hora atuais.
// Asynchronous function to generate a new ID based on an optional code and the current date and time.
const ID = (cod = 0) => {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const today = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = date.getTime();

    const id = `${cod}@${today}${month}${year}|${hours}${minutes}|¨${time}`;

    if (id) {
      resolve(id);
    } else {
      reject(new Error("ID not created."));
    }
  });
};

export default ID;
