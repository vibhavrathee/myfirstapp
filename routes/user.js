const express = require('express');
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const passport = require('passport')//for login

const users = require('../controllers/user');

router.get('/register', users.renderRegister)

router.post('/register', catchAsync(users.register))

router.get('/login', users.renderLogin)
//authentication me koi bhi dikkat ho to sab passport dekh lega//khud hi flash kardega issue with username or password
router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout', users.logout)

module.exports = router