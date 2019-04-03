chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			var GOOGLE_API_KEY = "";
			var SEARCH_ID = "";

			// Get the current domain URL to match against the list of whitelisted domains
			var url = window.location.hostname;
			var title = document.title;
			console.log(url);

			// Whitelisted domains
			var credList = new Array("www.revealnews.org",
				"www.theatlantic.com",
				"www.economicpolicyjournal.com",
				"www.washingtonmonthly.com",
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
				"assignments.gideontong.com",
				"keep.google.com",
				"www.github.com",
				"authentic.gq",
				"www.washingtonpost.com");

			// Check whether current website is credible
			function isCredible(weblist) {
				var credible = false;
				var url = window.location.hostname; // Get hostname
				console.log(url);
				for (var i = 0; i < 81; i++) {
					if (url == weblist[i]) {
						credible = true;
						console.log(credible);
					}
				}
				return credible;
			}

			// Create the banner
			if (!isCredible(credList)) {
				console.log("It works!");

				// Banner background
				var banner = document.createElement('div');
				banner.id = "banner";
				banner.style.background = "#FF5151";
				banner.style.textTransform = "uppercase";
				banner.style.width = "100%";
				banner.style.height = "180px";
				banner.style.position = "fixed";
				banner.style.top = "0px";
				banner.style.left = "0px";
				document.body.appendChild(banner);

				// Banner alert text
				var text = document.createElement('h1');
				text.innerHTML = "Authentic: This source may be unfactual.";
				text.style.fontSize = "30px";
				text.style.color = "white";
				text.style.textTransform = "uppercase";
				text.style.textAlign = "center";
				text.style.fontFamily = "Trebuchet MS";
				banner.appendChild(text)

				// Buttons div
				var buttons = document.createElement('div');
				buttons.style.cssFloat = "center";
				buttons.style.alignContent = "center";
				buttons.style.alignItems = "center";
				buttons.style.alignSelf = "center";
				buttons.style.textAlign = "center";
				banner.appendChild(buttons);

				// Pull the relevant article
				var q = title.replace(/[\W]/gi, "+").replace(/\s+/g, "");
				var search = "https://www.googleapis.com/customsearch/v1/siterestrict?" +
					"q=" + q + "&key=" + GOOGLE_API_KEY + "&cx=" + SEARCH_ID;

				// NEW HTTP Request style
				var request = new XMLHttpRequest();
				var response, parsable;
				request.open("GET", search, true);
				request.onreadystatechange = function () {
					if (request.readyState == 4 && request.status == 200) {
						response = request.responseText;
						// console.log(response);

						// Parse response from text to JSON
						parsable = JSON.parse(response);
						// console.log(parsable);
						console.log(parsable.items[0].title);
						console.log(parsable.items[0].link);

						var highlight = document.createElement('a');
						highlight.href = parsable.items[0].link;
						highlight.innerHTML = parsable.items[0].title;
						highlight.style.backgroundColor = "white";
						highlight.style.borderRadius = "13px";
						highlight.style.border = "1px solid #ffffff";
						highlight.style.display = "inline-block";
						highlight.style.cursor = "pointer";
						highlight.style.color = "#FF5151";
						highlight.style.fontFamily = "Trebuhet MS";
						highlight.style.fontSize = "18px";
						highlight.style.fontWeight = "bold";
						highlight.style.textTransform = "uppercase";
						highlight.style.padding = "17px 76px";
						highlight.style.textDecoration = "none";
						highlight.style.margin = "8px";
						highlight.style.textAlign = "center";
						buttons.appendChild(highlight);
					}
				}
				request.send();

				// special search engine document
				var results = document.createElement('a');
				results.href = "https://assignments.gideontong.com/search?q=" + q;
				results.innerHTML = "More Results";
				results.style.backgroundColor = "white";
				results.style.borderRadius = "13px";
				results.style.border = "1px solid #ffffff";
				results.style.display = "inline-block";
				results.style.cursor = "pointer";
				results.style.color = "#FF5151";
				results.style.fontFamily = "Trebuchet MS";
				results.style.fontSize = "18px";
				results.style.fontWeight = "bold";
				results.style.textTransform = "uppercase";
				results.style.padding = "17px 76px";
				results.style.textDecoration = "none";
				results.style.margin = "8px";
				results.style.textAlign = "center";
				buttons.appendChild(results);

			}

		}
	}, 10);
});