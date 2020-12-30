const express = require("express");
const kafka = require("./src/services/kafka/kafka");
const connectDB = require("./src/database");
const app = express();

// Connect database
connectDB();

const port = 3000;

app.get("/*", (req, res) => {
  res.send("Hello World! - FetchMe Worker");
});

// start server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// start kafka on server start
kafka.run();
