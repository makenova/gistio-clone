var express = require('express')
var http = require('http')
var path = require('path')
var errHandler = require('./services/errHandler')
var compress = require('compression')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var errorhandler = require('errorhandler')
var morgan = require('morgan')
var less = require('less-middleware')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(compress())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(less(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// development only
if (app.get('env') === 'development') {
  app.use(morgan('dev'))
  app.use(errorhandler())
} else {
  app.use(errHandler)
}

require('./routes')(app)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express ' + app.get('env') + ' listening on port ' + app.get('port'))
})
