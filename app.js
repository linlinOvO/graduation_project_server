var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pool = require('./routes/database')

// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const getUsersRouter = require('./routes/user/getUsers')
const getAccountRouter = require('./routes/login/login')
const getCategoryForTodayRouter = require('./routes/category/getCategoryForToday')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// test connection of database
pool.getConnection((err, connection) => {
  if (err) {
    // handle error
    console.error(err);
  } else {
    connection.query('SELECT * FROM RememberIt.accounts', (error, results, fields) => {
      connection.release();
      if (error) {
        // handle error
        console.error(error);
      } else {
        if(results.length === 5){
          console.log("connect mysql successfully");
        }
      }
    });
  }
});


// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/v1/users", getUsersRouter)
app.use("/api/v1/login", getAccountRouter)
app.use("/api/v1/category/today", getCategoryForTodayRouter)


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
