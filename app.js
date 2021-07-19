const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate');

const dotenv = require("dotenv");

dotenv.config();

const dbUrl = process.env.URL || 'mongodb://localhost:27017/myFirstDatabase'

const userRoutes = require('./routes/user')
const quizRoutes = require('./routes/quiz')
const reviewRoutes = require('./routes/review')
 
//for faking request like delete, patch ...
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')

const session = require('express-session')
const sessionConfig = {
    secret: "thisismysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())

const flash = require('connect-flash')
app.use(flash())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.urlencoded({extended: true}))//to access req.body in POST request
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')))

app.engine('ejs', ejsMate);
const Quiz = require('./models/quiz');
const Review = require('./models/review');
const router = require('./routes/quiz');
// const questions = require('./seeds/questions4');

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const code = process.env.PORT || 3000;
app.listen(code, () => {
    console.log('Serving on port 3000');
})

//MIDDLEWARE
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    res.locals.currentUser = req.user;//added by passport
    if(!['/login','/logout', '/register', '/home'].includes(req.originalUrl) && req.method === "GET") {   
        req.session.returnTo = req.originalUrl;
    }
    // if(!['/', '/login', '/register'].includes(req.originalUrl) && !req.isAuthenticated()) {//added by passport
    //     req.flash('error', 'You must be signed in')
    //     return res.redirect('/login')
    // }
    next();
})

app.use('/', quizRoutes)

app.use('/', userRoutes)

app.use('/review', reviewRoutes)

//error handling starts
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    // res.status(statusCode).send(message);
    if(!err.message) {
        err.message = "Who knows what went wrong"
    }
    res.status(statusCode).render('error', {err} )
})

