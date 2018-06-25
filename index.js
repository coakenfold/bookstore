/* eslint-disable no-console, no-unused-vars */
const PORT = process.env.PORT || 3000
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./src/server/models/userModel')
const Book = require('./src/server/models/bookModel')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
const BAD_SECRET = 'HARDCODINGtheSECRETforEXPEDIENCY'
mongoose.connect(
  process.env.MONGOLAB_URI,
  function(error) {
    if (error) {
      console.error(error)
    } else {
      console.log('mongo connected')
    }
  }
)

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (user.validPassword(password) === false) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  })
)

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  session({ secret: BAD_SECRET, resave: false, saveUninitialized: false })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/admin', ensureLoggedIn(), (req, res) => {
  console.log('Route: /admin!')
  res.status(200).json({ status: 'admin' })
})
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/',
  })
)
app.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

app.get('/books', function(req, res) {
  Book.find({}, (err, books) => {
    res.status(200).json(books)
  })
})
app.post('/books', function(req, res) {
  const book = new Book(req.body)
  book.save()
  res.status(200).json({ success: true })
})
app.delete('/books/:bookId', function(req, res) {
  Book.findById(req.params.bookId, (err, book) => {
    book.remove(err => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json({ success: true })
      }
    })
  })
})
app.put('/books/:bookId', function(req, res) {
  Book.findById(req.params.bookId, (err, book) => {
    console.log('111', req.body.title)
    book.isbn = req.body.isbn
    book.title = req.body.title
    book.author = req.body.author
    book.genre = req.body.genre
    book.price = req.body.price
    book.save()
    res.status(200).json({ success: true })
  })
})
app.listen(PORT, error => {
  if (error) {
    console.error(error)
    return process.exit(1)
  } else {
    console.log(`http://localhost:${PORT}`)
  }
})

// 404
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  console.log('error handler')

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  //res.render('error')
  res.json({ message: err.message })
})
