var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var dotenv = require('dotenv');
var cors = require('cors');

//carga las variables de entorno
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var ingredienteC = require('./src/controlador/ingredienteControlador');
var atencionC = require('./src/controlador/atencionControlador');
var sedeC = require('./src/controlador/sedeControlador');
var menuC = require('./src/controlador/menuControlador');
var clienteC = require('./src/controlador/clienteControlador');
var platoC = require('./src/controlador/platoControlador');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// soporte cors y headers de seguridad
app.use(cors());
app.use(helmet());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ingrediente', ingredienteC);
app.use('/atencion', atencionC);
app.use('/sede', sedeC);
app.use('/menu', menuC);
app.use('/cliente', clienteC);
app.use('/plato', platoC);

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
