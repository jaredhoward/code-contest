app.controller('adminController', function(
	$scope, $http, $rootScope, GetChallenges, GetUsers, GetUser, GetLanguages, GetChallenge, ActiveTab, Logout, RemoveAt, ReplaceAt) {
	  
	  $scope.add = false;
	  
	  $scope.deleteUser = function(user) {
	    $http.post('/api/delete_user/'+ user._id)
        .success(function(response) {
          $scope.users.removeAt(user._id);
        })
        .error(function(response) {
           console.log(response);
        });
	  };
	  
	  $scope.editUser = function(e) {
	    var obj = e.target ? e.target : e.srcElement;
	    if(obj.getAttribute('data-id') == 'edit') {
	      e.currentTarget.querySelector('select').removeAttribute('disabled');
	    }
	  };
	  
	  $scope.changeRole = function(index,userId,new_role) {
	    var data = {
	      role: new_role
	    };
	    $http.post('/api/edit_role/'+userId, data)
        .success(function(response) {
          document.getElementById('role'+index).setAttribute('disabled',true);
          console.log(response);
        })
        .error(function(response) {
          console.log(response);
        });
	  };
	  
    $scope.addLanguage = function(event,lang) {
      var data = {
        name: lang,
        versions: []
      };

      switch(event.keyCode){
        case 13:
          $http.post('/api/add_language', angular.toJson(data))
          .success(function(response) {
            $scope.add = false;
            $scope.newLanguage = '';
            $scope.languages.push(data);
            window.location.reload();
          })
          .error(function(response) {
             console.log(response);
          });
          break;
        case 27:
          $scope.add = false;
          break;
      }
    };
    
    $scope.looseFocus = function(event) {
      $scope.add = false;
    };
    
    $scope.deleteLanguage = function(language) {
      $http.post('/api/delete_language', {language: language.slug})
        .success(function(response) {
          $scope.languages.removeAt(language._id);
        })
        .error(function(response) {
           console.log(response);
        });
    };
    
    $scope.getVersions = function(languageName, languages) {
      for(var i=0;i<languages.length;i++) {
        if(languages[i].name === languageName) {
          $scope.activeLanguage = languages[i];
        }
      }
    };
    
    $scope.addVersion = function(version) {
      $scope.activeLanguage.versions.push(version);
      $scope.version = '';
      
      var data = {
        language: $scope.activeLanguage,
        version: version
      };
      
      $http.post('/api/add_version', angular.toJson(data))
        .success(function(response) {
          document.querySelector('[data-dismiss="modal"]').click();
          console.log(response);
        })
        .error(function(response) {
          console.log(response);
        });
    };
    
    $scope.deleteVersion = function(version) {
      var versions = $scope.activeLanguage.versions;
      var index = versions.indexOf(version);
      versions.splice(index,1);
      
      var data = {
        language: $scope.activeLanguage.slug,
        versions: versions
      };
      
      $http.post('/api/delete_version', angular.toJson(data))
        .success(function(response) {
          console.log(response);
          $scope.activeLanguage.versions = versions;
        })
        .error(function(response) {
          console.log(response);
        });
    };
    
    function map_languages(challenge) {
      var langArray = [];

      for(var i=0; i<$rootScope.languages.length; i++) {
        if(challenge.languages[$rootScope.languages[i].name] == true) {
          langArray.push($rootScope.languages[i]);
        }
      }

      return langArray;
    }
    
    $scope.addChallenge = function(challenge) {
      
      challenge.languages = map_languages(challenge);
     
      var data = {
        name: challenge.name,
        description: challenge.description,
        languages : challenge.languages
      };
      
      $http.post('/api/add_challenge', angular.toJson(data))
        .success(function(response) {
          $scope.challenges.unshift(response);
          document.querySelector('[data-dismiss="modal"]').click();
          $scope.challenge = {};
          console.log('Success');
        })
        .error(function(response) {
          console.log(response);
        });
    };
    
    $scope.editChallenge = function(challenge) {
      GetChallenge.get_challenge(challenge.slug);
    };
    
    $scope.check = function(language) {
      for(var i=0;i<$rootScope.challenge.languages.length;i++) {
        if ($rootScope.challenge.languages[i]._id == language._id) return true; 
      }
      return false;
    };
    
    $scope.updateChallenge = function(challenge) {
      
      challenge.languages = map_languages(challenge);
      
      var data = {
        name: challenge.name,
        description: challenge.description,
        languages : challenge.languages
      };

      $http.post('/api/update_challenge/' + challenge.slug, angular.toJson(data))
        .success(function(challenge) {
          document.querySelector('#close-update').click();
          $scope.challenges.replaceAt(challenge);
        })
        .error(function(response) {
          console.log(response);
        });
    };
    
    $scope.deleteChallenge = function(challenge) {
      $http.post('/api/delete_challenge/'+challenge.slug)
        .success(function(response) {
          console.log(response);
          $scope.challenges.removeAt(challenge._id);
        })
        .error(function(response) {
          console.log(response);
        });
    };
    
    $scope.showAddLanguage = function () {
      $scope.add = true;
      setTimeout(function(){
        document.getElementById('add-language').focus();
        document.getElementById('add-language').select();
      },200);
    };
});