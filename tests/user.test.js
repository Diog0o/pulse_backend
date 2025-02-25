const request = require("supertest");
const app = require("../app");
const User = require("../models/userSchema");
const { connectTestDB, closeTestDB, clearTestDB } = require("./testDatabase");

beforeAll(async () => {
  await connectTestDB();
}, 10000); // 10s timeout

afterAll(async () => {
  await closeTestDB();
}, 10000); // 10s timeout

beforeEach(async () => {
  await clearTestDB();
});

describe("User API tests", () => {

  it("Should create a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "test user",
      email: "testuser@gmail.com",
      password: "StrogPassword123!",
      profile_picture: "https://test.com",
      bio: "test bio",
      location: "test location",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty("_id");
    expect(res.body.user.username).toEqual("test user");
    expect(res.body).toHaveProperty("token");
    expect(res.body.password).not.toEqual("StrogPassword123!");
  });

  it("Should not allow duplicate email registration", async () => {
    await request(app).post("/api/users/register").send({
      username: "test user",
      email: "testuser@gmail.com",
      password: "StrogPassword123!",
      profile_picture: "https://test.com",
      bio: "test bio",
      location: "test location",
    });

    const res = await request(app).post("/api/users/register").send({
      username: "another user",
      email: "testuser@gmail.com",
      password: "AnotherPassword123!",
      profile_picture: "https://test.com",
      bio: "another bio",
      location: "another location",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Email already exists");
  });

  it("Should not create a user with invalid email", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "test user",
      email: "invalid-email",
      password: "StrogPassword123!",
      profile_picture: "https://test.com",
      bio: "test bio",
      location: "test location",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual("Email must be valid");
  });

  it("Should not create a user with weak password", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "test user",
      email: "testuser@gmail.com",
      password: "123",
      profile_picture: "https://test.com",
      bio: "test bio",
      location: "test location",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual(
      "Password must be a strong password"
    );
  });

it("Should login a user", async () => {
  await request(app).post("/api/users/register").send({
    username: "test user",
    email: "testuser@gmail.com",
    password: "StrogPassword123!",
    profile_picture: "https://test.com",
    bio: "test bio",
    location: "test location",
  });

  const res = await request(app).post("/api/users/login").send({
    email: "testuser@gmail.com",
    password: "StrogPassword123!",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("token");
  expect(res.body.user.email).toEqual("testuser@gmail.com");
});

it("Should delete a user", async () => {
  const user = await request(app).post("/api/users/register").send({
    username: "test user",
    email: "testuser@gmail.com",
    password: "StrogPassword123!",
    profile_picture: "https://test.com",
    bio: "test bio",
    location: "test location",
  });

  const res = await request(app)
    .delete(`/api/users/${user.body.user._id}`)
    .send();

  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("User was sucessfully deleted");
});

it("Should get a user by ID", async () => {
  const user = await request(app).post("/api/users/register").send({
    username: "test user",
    email: "testuser@gmail.com",
    password: "StrogPassword123!",
    profile_picture: "https://test.com",
    bio: "test bio",
    location: "test location",
  });


  const res = await request(app).get(`/api/users/${user.body.user._id}`).send();

  console.log(res.body);

  expect(res.statusCode).toEqual(200);
  expect(res.body.email).toEqual("testuser@gmail.com");
  expect(res.body.username).toEqual("test user");
});

});
