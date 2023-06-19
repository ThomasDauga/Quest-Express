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

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.UpdateMovie);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", userHandlers.postUser);
app.post("/api/users", validateUser, userHandlers.postUser);
app.put("/api/users/:id", userHandlers.updateUser);
app.put("/api/users/:id", validateUser, userHandlers.postUser);
app.post("/api/users", validateMovie, movieHandlers.postMovie);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
