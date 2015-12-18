app.controller('profileController', function(
	$scope, $http, GetUser, GetLanguages, GetUserSubmitions, ActiveTab, Logout, RemoveAt) {
    
    $scope.setLanguage = function(lang) {
		$scope.currentLanguage = lang;
		
		function str2bytes (str) { // conversion for zip files
	    var bytes = new Uint8Array(str.length);
	    for (var i=0; i<str.length; i++) {
	      bytes[i] = str.charCodeAt(i);
	    }
	    return bytes;
		}
		
		$scope.getFile = function(submition) {
			var data = atob(submition.file.buffer);
			if((submition.file.mimetype).indexOf('zip') != -1) {
				data = str2bytes(data);
			}
			var myBlob = new Blob([data], {type : submition.file.mimetype});
			saveAs(myBlob, submition.file.originalname);
		};
		
		$scope.deleteSubmition = function(id) {
			$http.post('/api/delete_submition/'+id)
        .success(function(response) {
          $scope.submitions.removeAt(id);
        })
        .error(function(err) {
          console.log(err);
        });
		};
	};
});