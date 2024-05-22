const Express = require("express");
const router = Express.Router();
const path = require("path");
const fs = require("fs");

const UserController = require("./controller/user.controller");
const MovieController = require("./controller/movie.controller");

router.post("/login", UserController.Login);
router.get("/movies", MovieController.GetAllMovies);
router.get("/movies/:movie_id", MovieController.GetTicketsByMovieId);
router.post("/book", MovieController.BookTicket);
router.get("/booking/:user_id", MovieController.GetBookingsByUserId);

module.exports = router;