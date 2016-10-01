/**
 * Helper function that will load data from the Princeton Election Consortium's endpoints
 * and update the extension's HTML pages with the data
 * 
 * @returns Void 
 */
function updatePECBackground() {
	updatePEC('background');
}


/**
 * Helper function that will load data from the Princeton Election Consortium's endpoints
 * and update the extension's HTML pages with the data
 * 
 * 
 * @returns Void 
 */
function updatePECPopup() {
	updatePEC('popup');
}

/**
 * Helper function that will load data from the Princeton Election Consortium's endpoints
 * and update the extension's HTML pages with the data
 * 
 * @param   String target one of 'popup' or 'background'
 * 
 * @returns Void 
 */
function updatePEC(target) {
	// the 'current_ev.html' is a microformat page consisting of a UL with a number of child LI elements.
	// the content of these change with the election season and we may update our formatting below to adjust
	$("#raw").load("http://election.princeton.edu/code/output/banner.html", function() {
		var newestPost = '';
		var newestPostByline = '';
		
		var lidata = [];
		
		for (i=0; i < 6; i++) {
			val = $("#raw li").eq(i).text();
			if (val !== '' && val !== 'RSS') {
				lidata.push(val);
			}
		}
		if (target == 'popup') {
			
			for (i=0; i< 6; i++) {
				if (typeof(lidata[i] != 'undefined')) {
					$("#li" + i).html(lidata[i]);					
				}
			}
			
			// load the RSS feed so we can link to the newest post
			$.get("http://election.princeton.edu/feed", function(data) {
				var $xml = $(data);
				$xml.find("item:first").each(function() {
					var $this = $(this),
						item = {
							title: $this.find("title").text(),
							link: $this.find("link").text(),
							description: $this.find("description").text(),
							pubDate: $this.find("pubDate").text(),
							author: $this.find("creator").text()	
						};
					
					newestPost = '<a href="' + item.link + '" target="_blank">' + item.title + '</a>';
					newestPostByline = 'by ' + item.author + ' at ' + item.pubDate;
				  $("#newest-post-link").html(newestPost);
				  $("#newest-post-byline").html(newestPostByline);
				});
			});		
			
			
			// graph image
			var graph_image_url = 'http://election.princeton.edu/wp-content/uploads/autographics/EV_histogram_today-200px.png';
			$("#graph-image").attr("src", graph_image_url);
			
			// map image
			var map_image_url = "http://election.princeton.edu/wp-content/uploads/autographics/EV_map.png-white";
			$("#map-image").attr("src", map_image_url);
			
			// hide spinner
			$("#spinner").hide();
			
			// reveal the loaded content container
			$("#loaded-content").show();
		}
		
		var title = lidata.join("\n");
		var badge = '';
		chrome.browserAction.setBadgeText({ text: badge });
		chrome.browserAction.setTitle( { title: title } );
	
	});    
	
}