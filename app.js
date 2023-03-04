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
const fileRouter = require('./routes/file')


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
    connection.query('SELECT * FROM RememberIt.accounts', (error) => {
      connection.release();
      if (error) {
        // handle error
        console.error(error);
      }
    });
  }
});

// update QARank every day at 00:00
function outputOneAtMidnight() {
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      pool.getConnection((err, connection) => {
        if (err) {
          // handle error
          console.error(err);
        } else {
          const updateQARank = 'UPDATE rememberIt.questionAnswers SET QARank = QARank * 0.8 WHERE QARank < 200;'
          const deleteTodayQAs = 'DELETE FROM rememberIt.todayQuestionAnswers;'
          connection.query(updateQARank + deleteTodayQAs, (error) => {
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

outputOneAtMidnight();



// Define the storage for the uploaded files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './upload/image');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Create the multer instance to handle file upload
const upload = multer({ storage: storage });

// Define the API endpoint to handle the file upload
app.post('/api/v1/file', upload.single('image'), (req, res) => {
  console.log(111)
  console.log(req)

  res.setHeader('Content-Type', 'application/json');

  if (req.file) {
    console.log(`Received file: ${req.file.originalname}`);
    res.status(200).send('File uploaded successfully');
  } else {
    res.status(400).send('No file uploaded');
  }
});




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
// app.use("/api/v1/file", fileRouter)

app.all('*', function(req, res, next) {
  setTimeout(function() {
    next();
  }, 120000); // 120 seconds
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
