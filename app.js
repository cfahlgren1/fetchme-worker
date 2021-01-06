const express = require("express");
const kafka = require("./src/services/kafka/kafka");
const connectDB = require("./src/database");
const admin = require("./src/admin/admin");

const app = express();

app.use(admin.adminBro.options.rootPath, admin.router);

// Connect database
connectDB();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World! - FetchMe Worker");
});

// start server
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`Listening at http://localhost:${port}`);
  console.log("🚀 started");
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process Terminated");
  });
});

// start kafka on server start
kafka.run();
