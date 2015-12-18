var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service.js');
var User = require('../models/user').User;
var Language = require('../models/language').Language;
var Challenge = require('../models/challenge').Challenge;
var Submition = require('../models/submition').Submition;
var restrict = require('../auth/restrict.js');
var multer  = require('multer')
var upload = multer();

function get_slug(str) {
  var result = (str.replace(/(\!|\?|\*|\:|;|&|\^|%|$|#|@|\+)/g,'')).toLowerCase();
  result = result.trim(); // remove trailing spaces
  result = result.replace(/('|\s+|\s|"|_|\.)/g,'-');
  result = result.replace(/-$/,''); //remove trailing slash
  return result;
}

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user) {
    return res.redirect('/challenges');
  }
  var vm = {
    title: 'Login',
    error: req.flash('error')
  };
  res.render('index', vm);
});

/* Users and login  */

router.get('/create-user', function(req, res, next) {
  res.render('users/create', {title: 'Create an account'});
});

router.get('/logout', function(req, res, next){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', function(req, res, next) {
  userService.addUser(req.body, function(err){
    if(err) {
      var vm = {
        title: 'Create an account',
        input: req.body,
        error: 'Oops! Something went wrong. Please try again later. ' + err
      };
      return res.render('/create-user', vm);
    }
    req.login(req.body, function(err){
       res.redirect('/challenges');
    });
  });
});

router.post('/login', passport.authenticate('local', {failureRedirect:'/', successRedirect:'/challenges', failureFlash: 'Invalid username or password.' }));

module.exports = router;

// - -----------------  API

////////// GET //////////

router.get('/api/get_users', function(req, res) {
  User.find({}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/api/get_user', function(req, res) {
  res.send(req.user);
});

router.get('/api/get_user/:id', function(req, res) {
  User.find({_id:req.params.id}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data[0]);
    }
  });
});

router.get('/api/get_languages', function(req, res) {
  Language.find({}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/api/get_language/:slug', function(req, res) {
  Language.find({slug:req.params.slug}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data[0]);
    }
  });
});

router.get('/api/get_submitions/challange/:slug', function(req, res) {
  Submition.find({'challenge.slug':req.params.slug}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/api/get_submitions/user', function(req, res) {
  Submition.find({'user._id':(req.user.id).toObjectId()}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});


router.get('/api/get_challenges', function(req, res) {
  Challenge.find({}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/api/get_challenge/:slug', function(req, res) {
  Challenge.find({slug:req.params.slug}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data[0]);
    }
  });
});

////////// POST //////////

router.post('/api/delete_user/:id', function(req, res) {
  User.remove({_id:req.params.id}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post('/api/edit_role/:id', function(req, res) {
  var query = { _id: req.params.id };
  User.update(query, { role: req.body.role }, function(err){
    if(err) {
      res.send(err);
    } else {
      res.send('Success!');
    }
  });
});

router.post('/api/add_challenge', function(req, res) {
  var challengeService = require('../services/challenge-service.js');
  req.body.slug = get_slug(req.body.name);
  challengeService.addChallenge(req.body, function(err,challenge){
    if(err) {
      var message = 'Failed to add a challenge';
    } else {
      var message = challenge;
    }
    return res.send(message);
   });
});

router.post('/api/delete_challenge', function(req, res) {
   var challengeService = require('../services/challenge-service.js');
   challengeService.deleteChallenge(req.body, function(err){
     if(err) {
       var message = 'Failed to delete a challenge';
     } else {
       var message = 'Succes';
     }
     return res.send(message);
   });
});

router.post('/api/add_language', function(req, res) {
  var languageService = require('../services/language-service.js');
  req.body.slug = get_slug(req.body.name)
   languageService.addLanguage(req.body, function(err){
     if(err) {
       var message = 'Failed to add a language';
     } else {
       var message = 'Success';
     }
     return res.send(message);
   });
});

router.post('/api/delete_language', function(req, res) {
  var languageService = require('../services/language-service.js');
   languageService.deleteLanguage(req.body, function(err){
     if(err) {
       var message = 'Failed to delete a language';
     } else {
       var message = 'Succes';
     }
     return res.send(message);
   });
});

router.post('/api/add_version', function(req, res) {
  var languageService = require('../services/language-service.js');
  languageService.addVersion(req.body, function(err){
    if(err) {
      var message = "Error!";
    } else {
      var message = "Success!";
    }
    res.send(message);
  });
});

router.post('/api/delete_version', function(req, res) {
  var languageService = require('../services/language-service.js');
   languageService.deleteVersion(req.body, function(err){
     if(err) {
       var message = 'Failed to delete a version';
     } else {
       var message = 'Succes';
     }
     return res.send(message);
   });
});

router.post('/api/upload', upload.single('file'), function(req, res) {
  var submitionService = require('../services/submition-service.js');
  req.body.user = req.user;
  submitionService.addSubmition(req.body, req.file, function(err,submition){
    if(err) {
      var message = 'Failed to add a submition';
    } else {
      var message = submition._id;
    }
    return res.send(message);
  });
});

router.post('/api/delete_submition/:id', function(req, res) {
  Submition.remove({_id:req.params.id}, function(err, data){
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post('/api/results/:submitionId', function(req, res) {
  res.send(req.body); // receive results
});

//Angular routes
router.get('*', restrict,function(req, res, next) {
    res.sendfile('./public/javascripts/app/index.html'); // load our public/index.html file
});

module.exports = router;
