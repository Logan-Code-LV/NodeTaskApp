const request = require("supertest");
const app = require("../server/app");
const User = require("../server/models/user");

const userOne = {
  name: "Mike",
  email: "mike@example.com",
  password: "56what!!",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

afterEach(() => {
  console.log("afterEach");
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "andy1@gmail.com",
      password: "hello1234",
    })
    .expect(200);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not log in nonexisting user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "remmy@remster.com",
      password: "woops",
    })
    .expect(400);
});
