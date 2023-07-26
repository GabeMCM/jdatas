import JDB from "./src/JDB/JDB.js";

const jd = new JDB();

const database = jd.JData("./dt");

const schema = database.JDSchema({
	name: String,
	age: Number,
});

const user = database.JDModel('user', null, schema);

user.save({
  name: "ricardo",
  age: '47'
})


