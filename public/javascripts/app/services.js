app.factory('GetChallenges', function( 
	$rootScope, $http){

  $http({
    method: 'GET',
    url: 'https://code-contest-denlight.c9.io/api/get_challenges'
  }).then(function successCallback(res){
    $rootScope.challenges = res.data;
  }, function errorCallback(err){
    console.log(err);
  });
    
	return true;
});

app.factory('GetUsers', function( 
	$rootScope, $http){

  $http({
    method: 'GET',
    url: 'https://code-contest-denlight.c9.io/api/get_users'
  }).then(function successCallback(res){
    $rootScope.users = res.data;
  }, function errorCallback(err){
    console.log(err);
  });
  
  return true;
});

app.factory('Logout', function( 
	$rootScope, $http, $location){
  $rootScope.logout = function() {
    $http({
      method: 'GET',
      url: '/logout'
    }).then(function successCallback(res){
      $location.path('/')
      window.location.reload();
    }, function errorCallback(err){
      console.log(err);
    });
  }

  
  return true;
});

app.factory('GetUser', function( 
	$rootScope, $http){
	  
    $http({
      method: 'GET',
      url: '/api/get_user'
    }).then(function successCallback(res){
      $rootScope.user = res.data;
    }, function errorCallback(err){
      return (err);
    });
    
    return true;
});

app.factory('GetLanguages', function( 
	$rootScope, $http){

  $http({
    method: 'GET',
    url: 'https://code-contest-denlight.c9.io/api/get_languages'
  }).then(function successCallback(res){
    $rootScope.languages = res.data;
    $rootScope.activeLanguage = res.data[0];
  }, function errorCallback(err){
    console.log(err);
  });
  
  return true;
});

app.factory('GetLanguage', function( 
	$rootScope, $http, $routeParams){

  $http({
    method: 'GET',
    url: '/api/get_language/' + $routeParams.language
  }).then(function successCallback(res){
    $rootScope.language = res.data;
  }, function errorCallback(err){
    console.log(err);
  });
  
  return true;
});

app.factory('GetSubmitions', function( 
	$rootScope, $http, $routeParams){
	  
    $http({
      method: 'GET',
      url: '/api/get_submitions/challange/' + $routeParams.challenge
    }).then(function successCallback(res){
      $rootScope.submitions = res.data;
    }, function errorCallback(err){
      console.log(err);
    });
  
  return true;
});

app.factory('GetUserSubmitions', function( 
	$rootScope, $http){

  $http.get('/api/get_submitions/user',{})
  .then(function(res){
    $rootScope.submitions = (res.data);
  }, function(err){
    console.log(err);
  });
  
  return true;
});

app.factory('GetChallenge', function( 
	$rootScope, $http, $routeParams){

  return {
    get_challenge : function(slug) {
      $http({
        method: 'GET',
        url: '/api/get_challenge/' + slug
      }).then(function successCallback(res){
        $rootScope.challenge = res.data;
        for(var i=0;i<$rootScope.challenge.languages.length;i++) {
          $rootScope.challenge.languages[$rootScope.challenge.languages[i].name] = true;
        }
      }, function errorCallback(err){
        console.log(err);
      });
    }
  };
  
});

app.factory('ActiveTab', function($rootScope){
  $rootScope.active=function(obj){
    if(obj.target.className.indexOf('no-action') == -1 && obj.target.localName == 'a') {
      obj.currentTarget.querySelector('a.active').className = '';
      obj.target.className = 'active';
    }
  };
  
  return true;
});

app.factory('RemoveAt', function(){
  Array.prototype.removeAt = function(id) {
    for (var item in this) {
      if (this[item]._id == id) {
        this.splice(item, 1);
        return true;
      }
    }
    return false;
  };
  
  return true;
});

app.factory('ReplaceAt', function(){
  Array.prototype.replaceAt = function(challenge) {
    for (var item in this) {
      if (this[item]._id == challenge._id) {
        this[item] = challenge;
        return true;
      }
    }
    return false;
  };
  
  return true;
});