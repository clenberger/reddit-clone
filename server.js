// Require Libraries
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
// App Setup


// add db

// Middleware
require('./controllers/posts.js')(app);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




// Routes
app.get('/', (req, res) => res.render('posts-index'));

app.get('/posts/new', (req,res) => res.render('post-new'));
// Start Server
app.listen(3000, () => {
    console.log('Reddit listening on port localhost:3000!');
});
