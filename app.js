const express = require("express");
const kafka = require('./src/services/kafka/kafka');
const app = express();
const Database = require('./src/database');

// instantiate database
let db = new Database();

const port = 3000;

const api_route = require("./src/routes/api/v1/routes");
app.use("/api/v1/", api_route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// start kafka on server start
kafka.run();


