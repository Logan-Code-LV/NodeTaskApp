const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");

const router = new express.Router();

const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a jpg, jpeg or png file"));
    }

    cb(undefined, true);
  },
});

//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

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // req.user.avatar = req.file.buffer;

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;

    await req.user.save();

    res.status(200).send({ message: "File uploaded successfully" });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();

    res.status(200).send({ message: "File removed successfully" });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/users", auth, async (req, res) => {
  try {
    const fetchUsers = await User.find({});
    res.status(200).send(fetchUsers);
  } catch (e) {
    res.status(500).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(error);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (e) {
    console.log("e", e);
    res.status(500).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const fetchUser = await User.findById(_id);
    res.status(200).send(fetchUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.status(200).send({ user });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  console.log(req.params.id);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    if (!req.user) {
      return res.status(404).send();
    }

    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  console.log(req.params);
  const userId = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    sendCancelationEmail(deleteUser.email, deleteUser.name);
    if (!deleteUser) {
      return res.status(404).send();
    }
    res.status(200).send(deleteUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get(
  "/users/:id/avatar",
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || !user.avatar) {
        throw new Error();
      }

      res.set("Content-Type", "image/png");

      res.send(user.avatar);
    } catch (e) {
      res.status(404).send();
    }
  },
  (error, req, res, next) => res.status(400).send({ error: error.message })
);

module.exports = router;
