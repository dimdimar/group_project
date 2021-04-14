var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config({ path: './.env'})




const forgotPassRouter = require('./routes/forgotPassword');
const indexRouter = require('./routes/pages');
const adminRouter = require('./routes/entered/admin')
const authRouter = require('./routes/auth');
const dashBoard = require('./routes/entered/dashBoard')
const search = require('./routes/entered/search')
const group = require('./routes/entered/group')
const groupCreate = require("./routes/entered/groupCreate")
const follow = require('./routes/entered/follows')
const success = require("./routes/entered/success")




const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.static('group'));
app.use(express.static('UsersPhoto'));

app.use('/', indexRouter);
app.use('/admin',adminRouter)
app.use('/auth', authRouter);
app.use('/dashboard',dashBoard);
app.use('/search',search);
app.use('/follow',follow);
app.use('/group',group);
app.use('/groupcreate',groupCreate);
app.use('/forgot',forgotPassRouter);
app.use('/success',success);





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
