const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    const saveTask = await task.save();
    res.status(200).send(saveTask);
  } catch (e) {
    res.status(400).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });

    res.status(200).send(req.user.tasks);
  } catch (e) {
    console.log("e", e);
    res.status(404).send("Task not found");
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    res.status(200).send(fetchTask);
  } catch (e) {
    console.log("e", e);
    res.status(404).send("Task not found");
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const taskId = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({ _id: taskId, owner: req.user._id });

    if (!task) {
      return res.status(404).send("Task not found");
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    console.log("e", e);
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      owner: req.user._id,
    });

    if (!task) {
      res.status(400).send("No task found");
    }

    res.status(200).send(task);
  } catch (e) {
    console.log("e", e);
    res.status(400).send(e);
  }
});

module.exports = router;
