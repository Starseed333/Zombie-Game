console.log("inside js 2")

$(document).ready(function(){

var queryURL = "https://api.unsplash.com/collections/142563/photos/?client_id=8282b5778d15130d8b4252e3f590c0d5bf52f33c545e6467bdd3ba7efbce1b83&query=outer+space+stars";
//var queryURL = "https://api.unsplash.com/photos/random/?client_id=8282b5778d15130d8b4252e3f590c0d5bf52f33c545e6467bdd3ba7efbce1b83&query=deep+space";


$.ajax({
	url : queryURL,
	method: "GET"
	})
.done(function(response) {

	var imgURL = (response[0].urls.full);

		console.log(response);
		$("body").css("background-image", "url("+imgURL+")");

		});


});

 





  