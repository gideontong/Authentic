chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		// Check if someone has browsed to infowars.com
		var url = window.location.hostname; // Get hostname
		console.log(url);
		
		// Create the banner
		if(url == "www.infowars.com") {
		  console.log("It works!");
		  var banner = document.createElement('div');
		  banner.id="banner";
		  banner.style.background = "#F00";
		  banner.style.width="100%";
		  banner.style.height="200px";
		  banner.style.position="fixed";
		  banner.style.top="20px";
		  document.body.appendChild(banner);
		  var text = document.createElement('h1');
		  text.innerHTML = "This is a sketch article!";
		  text.style.fontSize = "65px";
		  text.style.color = "white";
		  banner.appendChild(text)
  
		}


	}
	}, 10);
});