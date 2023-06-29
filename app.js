const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { validateMovie } = require("./validateMovie.js");
const { validateUser } = require("./validateUser");
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");
const verifyPassword = (req, res) => {
  res.send(req.user);
};

// ¨Public routes
app.get("/api/movies", movieHandler.getMovies);
app.get("/api/movies/:id", movieHandler.getMovieById);
app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUserById);
app.post("/api/users", validateUser, hashPassword, userHandler.postUser);

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Protected routes
app.use(verifyToken);

app.put("/api/movies/:id", validateMovie, movieHandler.updateMovieById);
app.post("/api/movies", validateMovie, movieHandler.postMovie);
app.delete("/api/movies/:id", movieHandler.deleteMovie);
app.put(
  "/api/users/:id",
  validateUser,
  hashPassword,
  userHandler.updateUserById
);
app.delete("/api/users/:id", userHandler.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
