# test-honeywell
Available Scripts
In the project directory, you can run:

# npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

# How To Test The Api

# login(post-method)
http://localhost:3000/api/login

parameter {
"user_id":"hsh001"
}
# get all movies(Get -method)
http://localhost:3000/api/movies

# get all movies by id(Get -method)
http://localhost:3000/api/movies/:movie_id

# Book ticket (Post-method)
http://localhost:3000/api/book
JSON parameters:
 {
"movie_id":"xoxo001", 
"user_id":"hsh001", 
"tickets":["xo007","xo008","xo009"]
}
# Get Ticket By USer Id 
http://localhost:3000//booking/hsh001
