/* eslint-disable no-console, no-unused-vars */
const PORT = process.env.PORT || 3000
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy

const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
const BAD_SECRET = 'HARDCODINGtheSECRETforEXPEDIENCY'
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function(email, password, cb) {
      //Assume there is a DB module pproviding a global UserModel
      /*return UserModel.findOne({ email, password })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' })
          }

          return cb(null, user, {
            message: 'Logged In Successfully',
          })
        })
        .catch(err => {
          return cb(err)
        })*/
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: BAD_SECRET,
    },
    function(jwtPayload, cb) {
      //find the user in db if needed
      /*      return UserModel.findOneById(jwtPayload.id)
        .then(user => {
          return cb(null, user)
        })
        .catch(err => {
          return cb(err)
        })*/
    }
  )
)

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))
app.get('/test', (req, res) => {
  console.log('Route: /test')
  res.status(200).json({ status: '/test' })
})

app.get('/api', (req, res) => {
  console.log('Route: /api')
  res.status(200).json({ status: '/api' })
})

app.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('Route: /admin')
    res.status(200).json({ status: '/admin!' })
  }
)

app.post('/auth', function(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(err)
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user,
      })
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err)
      }

      const token = jwt.sign(user, BAD_SECRET)

      return res.json({ user, token })
    })
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
  console.log('!!!!error!!!!')
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  //res.render('error')
  res.json({ message: err.message })
})
