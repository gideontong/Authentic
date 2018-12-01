chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var GOOGLE_API_KEY = "";
		var SEARCH_ID = "";

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		// Check if someone has browsed to infowars.com
		var url = window.location.hostname; // Get hostname
		var title = document.title;
		console.log(url);
		
		
		// Credible Websites
		var credList = new Array("www.revealnews.org",
		"www.theatlantic.com",
		"www.economicpolicyjournal.com",
		"washingtonmonthly.com",
		"www.usatoday.com",
		"www.news.com.au",
		"www.huffingtonpost.com",
		"www.nytimes.com",
		"theintercept.com",
		"jacobinmag.com",
		"socialistworker.org",
		"www.powerlineblog.com",
		"www.vox.com",
		"www.economist.com",
		"www.itv.comnews",
		"www.zeit.deindex",
		"elpais.com",
		"thehill.com",
		"www.theamericanconservative.com",
		"www.independent.co.uk",
		"71republic.com",
		"www.truthdig.com",
		"www.justfacts.com",
		"reason.com",
		"www.motherjones.com",
		"www.justfactsdaily.com",
		"www.timesofisrael.com",
		"www.thebalance.com",
		"rightweb.irc-online.org",
		"www.nbcnews.com",
		"www.axios.com",
		"abcnews.go.com",
		"www.weeklystandard.com",
		"www.thedailybeast.com",
		"c4ss.org",
		"www.newsoptimist.ca",
		"euromaidanpress.com",
		"fair.org",
		"www.fifthestate.org",
		"www.mediamatters.org",
		"people.com",
		"www.fairobserver.com",
		"www.pluralist.com",
		"www.salon.com",
		"www.theroot.com",
		"www.snopes.com",
		"qz.com",
		"time.com",
		"www.metro.us",
		"www.usnews.com",
		"shorensteincenter.org",
		"www.msn.com",
		"www.washingtonexaminer.com",
		"www.vvdailypress.com",
		"www.wsws.org",
		"www.irishtimes.com",
		"www.citizen.org",
		"knowherenews.com",
		"thelibertarianrepublic.com",
		"factmyth.com",
		"www.americanprogress.org",
		"www.rollingstone.com",
		"www.newser.com",
		"www.mcall.com",
		"www.csmonitor.com",
		"ijr.com",
		"www.newsobserver.com",
		"www.stripes.com",
		"washingtonpress.com",
		"www.fastcompany.com",
		"www.latimes.com",
		"slate.com",
		"thefederalist.com",
		"www.law.com",
		"iowastartingline.com",
		"www.commdiginews.com",
		"act.tv",
		"www.mediaite.com",
		"www.google.com",
		"assignments.gideontong.com");

		// Check whether current website is credible
		function isCredible(weblist){
			var credible = false;
			var url = window.location.hostname; // Get hostname
			console.log(url);
			for(var i =0;i<80;i++){
				if(url== weblist[i]){
					credible= true;
					console.log(credible);
				}
			}
			return credible;}


		// Create the banner
		if(!isCredible(credList)) {
		  console.log("It works!");

		  // Banner background
		  var banner = document.createElement('div');
		  banner.id="banner";
		  banner.style.background = "#B22222";
		  banner.style.width="100%";
		  banner.style.height="100px";
		  banner.style.position="fixed";
		  banner.style.top="20px";
		  document.body.appendChild(banner);

		  // Banner alert text
		  var text = document.createElement('h1');
		  text.innerHTML = "This is a sketch article!";
		  text.style.fontSize = "30px";
		  text.style.color = "white";
		  banner.appendChild(text)

		  // Pull the relevant article
		  var q = title.replace(/[\W]/gi, "+").replace(/\s+/g, "");
		  // console.log(q);
		  var search = "https://www.googleapis.com/customsearch/v1/siterestrict?"
			 + "q=" + q + "&key=" + GOOGLE_API_KEY + "&cx=" + SEARCH_ID;
		  // console.log(search);

		  // Original AJAX request 
		  /* $.ajax({
			  url: search,
			  type: "GET",
			  success: function(result) {
				console.log(result.items[0].title);
				console.log(result.items[0].link);
			  },
			  error: function(error) {
				  console.log("Error: " + error);
			  }
		  }) */

		  // NEW HTTP Request style
		  var request = new XMLHttpRequest();
		  var response, parsable;
		  request.open("GET", search, true);
		  request.onreadystatechange = function() {
			  if(request.readyState == 4 && request.status == 200) {
				  response = request.responseText;
				  // console.log(response);

				  // Parse response from text to JSON
				  parsable = JSON.parse(response);
				  // console.log(parsable);
				  console.log(parsable.items[0].title);
				  console.log(parsable.items[0].link);
				   
				  var highlight = document.createElement('p');
				  var highlight_link = document.createElement('a');
				  highlight_link.href = parsable.items[0].link;
				  highlight_link.innerHTML = parsable.items[0].title;
				  banner.appendChild(highlight);
				  highlight.appendChild(highlight_link);
			  }
		  }
		  request.send();

		  // special search engine document
		  var results = document.createElement('p');
		  var results_link = document.createElement('a');
		  results_link.href = chrome.runtime.getURL("search.html");
		  results_link.innerHTML = "More sources";
		  banner.appendChild(results);
		  results.appendChild(results_link);

		}


	}
	}, 10);
});