const express = require("express");
require("./db/mongoose");
require("./emails/account");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const multer = require("multer");

const app = express();
const port = process.env.PORT;

const upload = multer({
  dest: "images",
});
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(port, () => {
  console.log("Task App up n runnin on port", port);
});
