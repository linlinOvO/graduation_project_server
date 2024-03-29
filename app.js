const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const pool = require('./routes/database')
const multer = require('multer');

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const getUsersRouter = require('./routes/user/getUsers')


// const loginRouter = require('./routes/account/login')
const categoryRouter = require('./routes/category/category')
const statisticRouter = require('./routes/statistic/statistic')
const QARouter = require('./routes/questionAnswer/questionAnswer')
const checkInRouter = require('./routes/checkIn/checkIn')
const storeRouter = require('./routes/store/store')
const accountRouter = require('./routes/account/account')
const localRouter = require('./routes/local/local')
const fileRouter = require('./routes/file/file')


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


// test connection of database
pool.getConnection((err, connection) => {
  if (err) {
    // handle error
    console.error(err);
  } else {
    connection.query('SELECT * FROM rememberIt.accounts', (error) => {
      connection.release();
      if (error) {
        // handle error
        console.error(error);
      }
    });
  }
});

// update QARank every day at 00:00
function updateAtMidnight() {
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      pool.getConnection((err, connection) => {
        if (err) {
          // handle error
          console.error(err);
        } else {
          const updateInterval = 'UPDATE rememberIt.questionAnswers SET nextReview = nextReview - 1 WHERE nextReview < 10000;'
          const deleteTodayQAs = 'DELETE FROM rememberIt.todayQuestionAnswers;'
          const updateMemoryRecord = "INSERT INTO rememberIt.memoryRecord (userId, checkInDate, rememberWell, remember, familiar, forgot)" +
              "SELECT \n" +
              "    userId,\n" +
              "    NOW(),\n" +
              "    (SELECT GROUP_CONCAT(categoryId SEPARATOR ' ') FROM rememberIt.questionAnswers WHERE userId = accounts.userId AND QAInterval > 90) as rememberWell,\n" +
              "    (SELECT GROUP_CONCAT(categoryId SEPARATOR ' ') FROM rememberIt.questionAnswers WHERE userId = accounts.userId AND QAInterval > 60 AND QAInterval <= 90) as remember,\n" +
              "    (SELECT GROUP_CONCAT(categoryId SEPARATOR ' ') FROM rememberIt.questionAnswers WHERE userId = accounts.userId AND QAInterval > 30 AND QAInterval <= 60) as familiar,\n" +
              "    (SELECT GROUP_CONCAT(categoryId SEPARATOR ' ') FROM rememberIt.questionAnswers WHERE userId = accounts.userId AND QAInterval < 30) as forgot\n" +
              "FROM \n" +
              "    rememberIt.accounts;\n"
          //SELECT GROUP_CONCAT(categoryId SEPARATOR ' ') FROM rememberIt.questionAnswers WHERE userId = 1 AND QAInterval < 30;

          connection.query(updateInterval + deleteTodayQAs + updateMemoryRecord, (error) => {
            connection.release();
            if (error) {
              // handle error
              console.error(error);
            }
          });
        }
      });
    }
  }, 60000); // Check every minute
}

updateAtMidnight();

// Serve static files from the "images" directory
// 第一个是url，第二个是文件夹地址
app.use('/image', express.static('image'));
app.use('/audio', express.static('audio'));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/v1/users", getUsersRouter)


// app.use("/api/v1/login", loginRouter)
app.use("/api/v1/checkIn", checkInRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/q_a", QARouter)
app.use("/api/v1/store", storeRouter)
app.use("/api/v1/account", accountRouter)
app.use("/api/v1/statistic", statisticRouter)
app.use("/api/v1/local", localRouter)
app.use("/api/v1/file", fileRouter)

app.all('*', function(req, res, next) {
  setTimeout(function() {
    next();
  }, 12000); // 12 seconds
});

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
