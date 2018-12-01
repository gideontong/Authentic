chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		// Check if someone has browsed to infowars.com
		var url = window.location.href;
		console.log(url);
		if(url == "https://www.infowars.com/") {
		  console.log("It works!");
		}

	}
	}, 10);
});