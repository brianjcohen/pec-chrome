$().ready(function() {
	// run at load
	updatePECBackground();
	
	// set interval at 2 hours
	var interval = 2 * 60 * 60 * 1000;
	setInterval(updatePECBackground, interval);
});




