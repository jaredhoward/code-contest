var Submition = require('../models/submition').Submition;

exports.addSubmition = function(data, file, next) {
  console.log(data)
    var newSubmition = new Submition({
      user: data.user,
      challenge: JSON.parse(data.challenge),
      language: JSON.parse(data.language),
      file: file,
      results: []
    });
    
    newSubmition.save(function(err,res){
      if(err) {
        return next(err,null);
      }
      return next(null,res);
    });
};