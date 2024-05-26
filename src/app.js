const path = require("path");
const express = require("express");
require("./db/mongoose");
require("./emails/account");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

// Catch-all route handler
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = app;
