const express = require('express');
const app = express();
const Http = require('http');
const port = 3000;
const cors = require('cors');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = Http.createServer(app);

app.use(cors('*'));

const MaserRouter = require('./routes');
app.use('/api', MaserRouter);






server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

