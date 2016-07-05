$(document).ready(function() {
	// run at load
	updatePECBackground();
	
	// set interval at 2 hours
	var interval = 8 * 60 * 60 * 1000;
	setInterval(updatePECBackground, interval);
});




