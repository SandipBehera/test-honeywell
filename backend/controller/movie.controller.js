const movieData = require('../data/movie_list.json');
const fs = require('fs');
exports.GetAllMovies = async (req, res) => {

    try {
        res.status(200).json({
            message: "All Movies",
            data: movieData
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

}

exports.GetTicketsByMovieId = async (req, res) => {
    const { movie_id } = req.params;
    const movie = movieData.find(movie => movie.id === movie_id);
    try {
        if (movie) {
            res.status(200).json({
                message: "Movie found",
                data: movie
            });
        }
        else {
            res.status(404).json({
                message: "Movie not found"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

exports.BookTicket = async (req, res) => {
    const {movie_id, user_id, tickets} = req.body;

    try{
        const movie = movieData.find(movie => movie.id === movie_id);

        if (movie) {
            movie.booked_tickets = Number(movie.booked_tickets);
            if ((movie.no_of_tickets - movie.booked_tickets) >= tickets.length) {
                // Update the movie json
                movie.booked_tickets = movie.booked_tickets + tickets.length;
                fs.writeFileSync('./data/movie_list.json', JSON.stringify(movieData));
    
                // Read existing booking details
                let bookedData = [];
                try {
                    const bookedDataString = fs.readFileSync('./data/booking_details.json');
                    bookedData = JSON.parse(bookedDataString);
                } catch (err) {
                    console.error('Error reading booking details:', err);
                }
    
                // Update the booking json
                const booking = {
                    movie_id,
                    user_id,
                    tickets
                };
                bookedData.push(booking);
                fs.writeFileSync('./data/booking_details.json', JSON.stringify(bookedData));
    
                // Respond with success message
                res.status(200).json({
                    message: "Tickets booked successfully"
                });
            } else {
                res.status(400).json({
                    message: "Not enough tickets available"
                });
            }
        } else {
            res.status(404).json({
                message: "Movie not found"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

exports.GetBookingsByUserId = async (req, res) => {
    const { user_id } = req.params;
    let bookingData = [];
    try {
        const bookedDataString = fs.readFileSync('./data/booking_details.json');
        bookingData = JSON.parse(bookedDataString);
    } catch (err) {
        console.error('Error reading booking details:', err);
    }
    const userBookings = bookingData.filter(booking => booking.user_id === user_id);
    try {
        if (userBookings.length > 0) {
            res.status(200).json({
                message: "User bookings",
                data: userBookings
            });
        } else {
            res.status(404).json({
                message: "No bookings found"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}