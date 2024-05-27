const path = require("path");
const express = require("express");
require("./db/mongoose");
require("./emails/account");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3005;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Catch-all route handler
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  console.log("Task App up n runnin on port", port);
});
