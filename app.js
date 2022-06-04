// App.js

/*
    SETUP
*/
const util = require('util');
require('util.promisify').shim();
var mysql = require("mysql");

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//possible fix??
// app.use(express.static(__dirname + '/public'));
// console.log('Current directory: ' + process.cwd())


var path = require('path');
app.use(express.static('public'))

// app.use(express.static(path.join(__dirname, 'public')));

PORT        = 8990;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { Http2ServerRequest } = require('http2');
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name != "")
        query1 = `SELECT * FROM customers WHERE customer_name LIKE "${req.query.name}%"`;
    else
        query1 = `SELECT * FROM customers`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Run the second quer
            res.render('about', {data: rows});
        })
});                                                       // received back from the query                              // requesting the web site.

// app.js

app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let td = parseInt(data['input-total_dropoff']);
    if (isNaN(td))
    {
        td = 'NULL'
    }

    let tr = parseInt(data['input-total_recycle']);
    if (isNaN(tr))
    {
        tr = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO customers(customer_name, total_dropoff, total_recycle) VALUES ('${data['input-name']}', ${data['input-total-dropoff']}, ${data['input-total-recycle']})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});