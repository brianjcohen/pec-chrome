function updatePECBackground() {
	updatePEC('background');
}
function updatePECPopup() {
	updatePEC('popup');
}
function updatePEC(target) {
	$("#raw").load("http://election.princeton.edu/wp-content/uploads/autotext/current_ev.html", function() {
   	
		var updated = $("#raw li").eq(0).text();	
		var democrats = $("#raw li").eq(1).text();
		var republicans = $("#raw li").eq(2).text();
		var mm = $("#raw li").eq(3).text();
		var reelect = $("#raw li").eq(5).text();
		
		var newestPost = '';
		var newestPostByline = '';
		
		if (target == 'popup') {
			
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
							
					}
					
					newestPost = '<a href="' + item.link + '" target="_blank">' + item.title + '</a>';
					newestPostByline = 'by ' + item.author + ' at ' + item.pubDate;
				  $("#newest-post-link").html(newestPost);
				  $("#newest-post-byline").html(newestPostByline);
				});
			});		
			
			//var graph_image_url = 'http://election.princeton.edu/wp-content/uploads/autographics/EV_history-200px.png';
			//var graph_image_url = 'http://election.princeton.edu/wp-content/uploads/autographics/EV_histogram_today.jpg';
			var graph_image_url = 'http://election.princeton.edu/wp-content/uploads/autographics/Obama_generic_history.jpg';
			
			//var map_image_url = "http://election.princeton.edu/wp-content/uploads/autographics/EV_map-200px.png";
			//var map_image_url = 'http://election.princeton.edu/wp-content/uploads/autographics/Senate_seat_history.jpg';
			$("#graph-image").attr("src", graph_image_url);
			//$("#map-image").attr("src", map_image_url);
			
			$("#pec-updated").html(updated);
			$("#democrats-ev").html(democrats);
			$("#republicans-ev").html(republicans);
			$("#meta-margin").html(mm);
			$("#reelect").html("<strong>" + reelect + "</strong>");
			
			
			$("#spinner").hide();
			$("#loaded-content").show();
		}
		
		chrome.browserAction.setBadgeText({ text: mm.replace("Meta-Margin: ", "").replace("D +","D").replace("R +", "R").replace("%","") });
	
	});    
	
}