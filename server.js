// Require Libraries
require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./data/reddit-db');



// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());
app.use(cookieParser());


// Middleware
var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};
app.use(checkAuth);


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);


// Routes
app.get('/', (req, res) => res.render('posts-index'));

app.get('/post/new', (req,res) => res.render('post-new'));
// Start Server
app.listen(3000, () => {
    console.log('Reddit listening on port localhost:3000!');
});
module.exports = app;