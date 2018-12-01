chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var GOOGLE_API_KEY = "";

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		// Check if someone has browsed to infowars.com
		var url = window.location.hostname; // Get hostname
		var title = document.title;
		console.log(url);
		
		// Create the banner
		if(url == "www.infowars.com") {
		  console.log("It works!");

		  // Banner background
		  var banner = document.createElement('div');
		  banner.id="banner";
		  banner.style.background = "#F00";
		  banner.style.width="100%";
		  banner.style.height="200px";
		  banner.style.position="fixed";
		  banner.style.top="20px";
		  document.body.appendChild(banner);

		  // Banner alert text
		  var text = document.createElement('h1');
		  text.innerHTML = "This is a sketch article!";
		  text.style.fontSize = "65px";
		  text.style.color = "white";
		  banner.appendChild(text)

		  // Pull the relevant article
		  var q = title.replace(/[\W]/gi, "+").replace(/\s+/g, "");
		  // console.log(q);
		  var search = "https://www.googleapis.com/customsearch/v1/siterestrict?"
			+ "key=" + GOOGLE_API_KEY + "&q=" + q;
		  // console.log(search);

		  /*$.ajax({
			  url: search,
			  type: "GET",
			  success: function(result) {
				  console.log(result.items);
			  },
			  error: function(error) {
				  console.log("Error: " + error);
			  }
		  })*/

		  // special search engine document
		  var highlight = document.createElement('p');
		  var highlight_link = document.createElement('a');
		  var x = "google.com";
		  highlight_link.href = x;
		  console.log(x);
		  highlight_link.innerHTML = "More sources";
		  banner.appendChild(highlight);
		  highlight.appendChild(highlight_link);

		}


	}
	}, 10);
});