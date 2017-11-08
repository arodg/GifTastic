// 1. Create array of world cuisines
// 2. Function that loops through array and adds buttons
// 3. Function to create new button from user input
// 4. Funtion to call Giphy and show gifs
// 5. Function to switch image from still to animate

$(document).ready(function() {

var topics = ["Japanese", "Mexican", "Indian", "Italian", "Spanish", "French", "Thai", "Chinese","Turkish", "Spanish"];

function displayButton() {
	for (var i=0; i<topics.length; i++) {
		var buttons = $("<button>");
		buttons.text(topics[i]);
		buttons.attr("data-id", topics[i]);
		buttons.addClass("cuisine");
		$("#buttons").append(buttons);
	}
}

function addButton() {
	$("#addButton").on("click", function() {
		$("#buttons").empty();
		var newTopic = $("#newInput").val().trim();
		topics.push(newTopic);
		$("#newInput").val('');
		displayButton();
	});	
}

displayButton();
addButton();

function chooseCuisine() {
	$("#images").empty();
	
	var searchTerm = $(this).attr("data-id");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + " food"  + "&api_key=4ZhFPyOy5EBQPz5Z0AnMF4Ew1C7AnjLr&limit=10&lang=en";
	
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {
		for (i=0; i<10; i++) {
			var stillImage = response.data[i].images.fixed_height_still.url;
			var animateImage = response.data[i].images.fixed_height.url;
			var imgDiv = $("<div>");
			var imgTag = $("<img>").attr("src", stillImage);
			imgTag.attr("src1", stillImage);
			imgTag.attr("src2", animateImage);
			imgTag.attr("alt", searchTerm + i);
			imgTag.addClass("image");
			imgDiv.append(imgTag);
			$("#images").append(imgDiv);
			var rating = response.data[i].rating
			var ratingTag = $("<p>").text("Rating: " + rating.toUpperCase());
			$("#images").append(ratingTag);

		}
	});
};

function switchImage() {
	var stillImage = $(this).attr("src1");
	var animateImage = $(this).attr("src2");

	if ($(this).attr("src1") == $(this).attr("src")) {
		$(this).attr("src", animateImage);
	}

	else {
		$(this).attr("src", stillImage);
	}
};

$(document).on("click", ".cuisine", chooseCuisine);
$(document).on("click", ".image", switchImage);



}); // document.ready()
