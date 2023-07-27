import JDB from "./src/JDB/JDB.js";

const jd = new JDB();

const database = jd.JData("./dt");

const schema = database.JDSchema({
  name: String,
  age: Number,
  locale: String,
});

const user = database.JDModel('user', null, schema);

try{
  const result = await user.save({
    name: "ricardo",
    age: 47,
  }).then(resultado => {
    console.log(resultado )
  }).catch(error => {
    console.log(error)
  })

  console.log(result)
} catch(error) {
  console.log(error)
}

