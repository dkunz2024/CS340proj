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

//Add some pathing so we are able to use our CSS and JS files in the public folder
var path = require('path');
app.use(express.static('public'))

PORT = 8994;                 // Set a port number at the top so it's easy to change in the future

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

//home page
app.get('/', function(req, res)
{
    // Declare Query 1
    let query1;
    query1 = `SELECT * FROM customers`;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name)
        query1 = `SELECT * FROM customers WHERE customer_name LIKE "${req.query.name}%"`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Run the second quer
            res.render('about', {data: rows});
        })
}); 

//about page
app.get('/about', function(req, res)
{
    // Declare Query 1
    let query1;
    query1 = `SELECT * FROM customers`;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name)
        query1 = `SELECT * FROM customers WHERE customer_name LIKE "${req.query.name}%"`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Run the second quer
            res.render('about', {data: rows});
        })
}); 

//customers page
app.get('/customers', function(req, res)
{
    // Declare Query 1
    let query1;
    query1 = `SELECT * FROM customers`;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name)
        query1 = `SELECT * FROM customers WHERE customer_name LIKE "${req.query.name}%"`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Run the second quer
            res.render('customers', {data: rows});
        })
});                                                       // received back from the query                              // requesting the web site.

// ADD A CUSTOMER FORM
app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

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
            res.redirect('/Customers');
        }
    })
});


//drop off orders page
app.get('/dropOffOrders', function(req, res)
{
    // Declare Query 1
    let query1;
    query1 = `SELECT * FROM drop_off_orders`;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name)
        query1 = `SELECT * FROM drop_off_orders WHERE dropoff_id LIKE "${req.query.name}%"`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Run the second quer
            res.render('dropOffOrders', {data: rows});
        })
});   

//ADD DROPOFF ORDER
app.post('/add-dropoff-orders-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
 
    // Create the query and run it on the database
    query1 = `INSERT INTO drop_off_orders( id, weight, recyclable_weight) VALUES ('${data['input-id']}', ${data['input-weight']}, ${data['input-r-weight']})`;
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
            res.redirect('/dropOffOrders');
        }
    })
});



//sales orders page
app.get('/salesOrders', function(req, res)
{
    // Declare Query 1
    let query1;
    query1 = `SELECT * FROM sales_orders`;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name)
        query1 = `SELECT * FROM sales_orders WHERE material LIKE "${req.query.name}%"`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Run the second quer
            res.render('salesOrders', {data: rows});
        })
});   

//ADD SALE ORDER
app.post('/add-sales-orders-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
 
    // Create the query and run it on the database
    query1 = `INSERT INTO sales_orders( id, weight, material) VALUES ('${data['input-id']}', '${data['input-weight']}', '${data['input-material']}')`;
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
            res.redirect('/salesOrders');
        }
    })
});


//waste orders page
app.get('/wasteOrders', function(req, res)
{
    // Declare Query 1
    let query1;
    query1 = `SELECT * FROM waste_orders`;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name)
        query1 = `SELECT * FROM waste_orders WHERE waste_id LIKE "${req.query.name}%"`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Run the second quer
            res.render('wasteOrders', {data: rows});
        })
});   

//ADD WASTE ORDER
app.post('/add-waste-order-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
 
    // Create the query and run it on the database
    query1 = `INSERT INTO waste_orders( dropoff_id2, weight, location_id2) VALUES ('${data['input-dropoff-id']}', '${data['input-weight']}', ${data['input-location-id']})`;
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
            res.redirect('/wasteOrders');
        }
    })
});

//waste locations page
app.get('/wasteLocations', function(req, res)
{
    // Declare Query 1
    let query1;
    query1 = `SELECT * FROM waste_location`;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name)
        query1 = `SELECT * FROM waste_location WHERE customer_name LIKE "${req.query.name}%"`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Run the second quer
            res.render('wasteLocations', {data: rows});
        })
});   

//ADD WASTE LOCATION
app.post('/add-waste-location-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
 
    // Create the query and run it on the database
    query1 = `INSERT INTO waste_location( location_name, cost ) VALUES ('${data['input-name']}', '${data['input-cost']}')`;
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
            res.redirect('/wasteLocations');
        }
    })
});


//DELETE FROM CUSTOMERS
app.delete('/delete-customer-ajax', function(req,res,next){
    let data = req.body;
    let customer_id = parseInt(data.id);
    let deleteBsg_Cert_People = `DELETE FROM customers WHERE id = ?`;
    let deleteBsg_People= `DELETE FROM customers WHERE id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteBsg_Cert_People, [customer_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteBsg_People, [customer_id], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});