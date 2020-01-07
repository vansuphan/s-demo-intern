require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.secret_cookies));

var userRoute = require('./routes/user.route');
var loginMiddelware = require('./middelware/login.middelware');
var authMiddelware = require('./middelware/auth.middelware');
var sessionMiddelware = require('./middelware/session.middelware');

var cookieParser = require('cookie-parser');

//---------connect database--------
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(err);
});
// ---------connect database-------

app.get('/', function (req, res) {
  res.render('login');
});

app.post('/', loginMiddelware.postLogin);

app.use('/user', authMiddelware.requireAuth, sessionMiddelware.sessionID, userRoute);// routing User


app.listen(port, () => console.log(`App listening on port ${port}!`));