var Language = require('../models/language').Language;

exports.addLanguage = function(language, next) {
    var newLanguage = new Language({
      name : language.name,
      slug : language.slug,
      versions:[]
    });
    
    newLanguage.save(function(err){
      if(err) {
        return next(err);
      }
      return next(null);
    });
};

exports.deleteLanguage = function(data, next) {
    Language.remove({slug:data.language},function(err){
      if(err) {
        return next(err);
      }
      return next(null);
    });
};

exports.addVersion = function(data, next) {
  Language.findOne({name: data.language.name}, function(err, language){
    if (err) { return next(err); }
    language.versions.push(data.version);
    language.save(function(err) {
      if (err) { 
        return next(err); 
      } else {
        next(null);
      }
    });
  });
};

exports.deleteVersion = function(data, next) {
  var conditions = { slug: data.language }
  var update = { $set: { versions: data.versions }}
  var options = {};
  Language.update(conditions, update, options,function(err){
    if(err) {
      return next(err);
    }
    return next(null);
  });
};