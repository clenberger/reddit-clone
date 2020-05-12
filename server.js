// Require Libraries
require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');



// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());
app.use(cookieParser());
// App Setup


// add db

// Middleware


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./data/reddit-db');


// Routes
app.get('/', (req, res) => res.render('posts-index'));

app.get('/post/new', (req,res) => res.render('post-new'));
// Start Server
app.listen(3000, () => {
    console.log('Reddit listening on port localhost:3000!');
});
module.exports = app;