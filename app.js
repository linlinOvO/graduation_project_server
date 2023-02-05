const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const pool = require('./routes/database')

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const getUsersRouter = require('./routes/user/getUsers')


const loginRouter = require('./routes/login/login')
const categoryRouter = require('./routes/category/category')
const QARouter = require('./routes/questionAnswer/questionAnswer')
const checkInRouter = require('./routes/checkIn/checkIn')


const app = express();

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
    connection.query('SELECT * FROM RememberIt.accounts', (error, results) => {
      connection.release();
      if (error) {
        // handle error
        console.error(error);
      }
    });
  }
});


// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/v1/users", getUsersRouter)


app.use("/api/v1/login", loginRouter)
app.use("/api/v1/check_in", checkInRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/q_a", QARouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
