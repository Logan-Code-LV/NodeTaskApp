const app = require("./app");
const express = require("express");
const path = require("path");
const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("home page");
});

// Catch-all route handler
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log("Task App up n runnin on port", port);
});
