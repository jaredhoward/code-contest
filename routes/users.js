var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next) {
  userService.findUser((req.body.email).toLowerCase(),function(err,res){
    console.log(res);
  });
  userService.addUser(req.body, function(err) {
    if (err) {
      console.log(err);
      var vm = {
        title: 'Create an account',
        input: req.body, ///////////////////////////// fix it
        error: err
      };
      delete vm.input.password;
      return res.render('users/create', vm);
    }
    req.login(req.body, function(err) {
      res.redirect('/challenges');
    });
  });
});

router.post('/login', 
  function(req, res, next) {
    next();
  },
  passport.authenticate('local', {
    failureRedirect: '/', 
    successRedirect: '/challenges',
    failureFlash: 'Invalid credentials'
  }));

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
