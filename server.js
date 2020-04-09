require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmut");
const cors = require("cors");
const MOVIEDEX = require("./moviedex.json");

const app = express();

app.use(morgan("dev"));
app.use(helmut());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authTOken = req.get("Authorization");

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  next();
});

app.get("/movie", function handleGetMovie(req, res) {
  let response = MOVIEDEX.film_title;

  if (req.query.genre) {
    response = response.filter((film_title) =>
      film_title.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  if (req.query.country) {
    response = response.filter((film_title) =>
      film_title.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }

  if (req.query.avg_vote) {
    //When searching by average vote, 
    //users are searching for Movies with an 
    //avg_vote that is greater than or equal to 
    //the supplied number.
    response = response.filter((film_title) =>
      film_title.avg_vote
        .toLowerCase()
        .includes(req.query.avg_vote.toLowerCase())
    );
  }
});

const PORT = 8002;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
