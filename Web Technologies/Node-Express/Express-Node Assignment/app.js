var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// customn code starts here
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

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
  try {
  dbConn.query('SELECT * FROM users', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
  }); }
  catch(err){
    return next(err);
  }
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
  res.send(JSON.stringify(results));
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

//custome code ends here

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;