import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "latihan-htmx",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
  }
});

export default db;
