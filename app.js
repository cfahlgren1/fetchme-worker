const express = require("express");
const kafka = require("./src/services/kafka/kafka");
const connectDB = require("./src/database");
const morgan = require("morgan");
const admin = require("./src/admin/admin");

const app = express();
app.use(admin.adminBro.options.rootPath, admin.router);

// log requests using morgan
app.use(morgan("combined"));

// Connect database
connectDB();

const port = 3000;

// Define Routes
app.use("/api/v1/user", require("./src/routes/api/v1/user"));
app.use("/api/v1/auth", require("./src/routes/api/v1/auth"));
app.use("/api/v1/profile", require("./src/routes/api/v1/profile"));
app.use("/api/v1/requests", require("./src/routes/api/v1/requests"));
app.use("/api/v1/team", require("./src/routes/api/v1/team"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// start kafka on server start
kafka.run();
