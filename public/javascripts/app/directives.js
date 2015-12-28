app.directive('getIndex', function(){
	return {
		priority: 1,
		terminal: true,
		link: function(scope, element, attr) {
			var index = element[0].parentNode.rowIndex;
			element[0].innerHTML = index + '. ';
		}
	}
});

app.directive('fadeIn', function ($compile) {
    return function (scope, element, attrs) {
    	element[0].style.opacity= 0;
    	setTimeout(function() {
    		element[0].style.opacity= 1;
    	}, 100);
    };
});

app.directive('confirm', function(){
	return {
		priority: 1,
		terminal: true,
		link: function(scope, element, attr) {
			var msg = attr.confirm || "Are you sure you want to do this?";
			var clickAction = attr.ngClick;
			element.bind('click', function(e) {
				if (window.confirm(msg)) {
					scope.$eval(clickAction);
					if(document.querySelector('div.modal-backdrop.in')) { //close modal after save
						var button = e.target ? e.target : e.srcElement;
						button.parentNode.querySelector('[data-dismiss="modal"]').click();
					}	
				} else {
					e.preventDefault();
				}
			});
		}
	}
});