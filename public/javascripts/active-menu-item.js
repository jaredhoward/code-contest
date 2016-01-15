jQuery(document).ready(function($){
  var menuItems = [];

  $('#menu li').each(function(index){
    var href = $('a',this).attr('href');
    if(typeof href != 'undefined') {
      menuItems.push($('a',this).attr('href'));
    }
  });
  
  var currentUrl = window.location.pathname;
  
  $('#menu li').removeClass('active');
  
  for (var i = 0; i < menuItems.length; i++) {
    if(currentUrl.indexOf(menuItems[i]) != -1) {
      var item = $('#menu a[href="' + menuItems[i] + '"]');
      $(item).parent().addClass('active');
      break;
    }
  }
});