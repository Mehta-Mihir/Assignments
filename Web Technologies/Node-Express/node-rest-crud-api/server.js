var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;

// connection configurations
var mysql=require('mysql');
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodedemo'
});
// connect to database
dbConn.connect(); 

// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

// Retrieve user with id 
app.get('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'users list.' });
    });
});

// Add a new user  
app.post('/add', function (req, res) {
    var user = req.body;
    //console.log(req.body);
    dbConn.query("INSERT INTO nodedemo.users SET ?", user, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

//rest api to update record into mysql database
app.put('/update', function (req, res) {
    var user=req.body;
    var user_id=req.body.id;
    //console.log(user_id);
    dbConn.query("UPDATE nodedemo.users SET ? WHERE id = ?", [user, user_id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//  Delete user
app.delete('/delete', function (req, res) {
    let user_id = req.body.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
});