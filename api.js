console.log("inside js 2")


var queryURL = "https://api.unsplash.com/search/photos/?client_id=8282b5778d15130d8b4252e3f590c0d5bf52f33c545e6467bdd3ba7efbce1b83&query=deep+space";

$.ajax({
	url : queryURL,
	method: "GET"
	})
.done(function(response) {

	var imgURL = (response.results[0].urls.full);

		console.log(response.results[0].urls.full);
		$("body").css("background-image", "url("+imgURL+")");

		});
