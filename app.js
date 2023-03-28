const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

// init express
const app = express();

// Prepare for mongoose 7
mongoose.set('strictQuery', false);
// Define the database URL to connect to.
const mongoDB = process.env.URI;

// Wait for database to connect, logging an error if there is a problem 
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
mongoose.Promise = global.Promise;

require('./auth/auth');

app.use(cors());

// import routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const blogPostRouter = require('./routes/blog_secure');
const blogRouter = require('./routes/blog');

app.use(bodyParser.urlencoded({ extended: false }));

// use routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/blog', blogRouter);
app.use('/blog-secure', passport.authenticate('jwt', { session: false }), blogPostRouter);

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
});

module.exports = app;
