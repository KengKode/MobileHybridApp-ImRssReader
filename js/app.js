

var app = function() {

	var version = '1.0';

	var init = function(){

		function onDeviceReady() {
			$(document).ready(function(){
				console.log('App\'s ready!');
			});
		}
		document.addEventListener("deviceready", onDeviceReady, false);

	};

	return {
		init: function() {
			init();
		}
	}

}();

app.init();