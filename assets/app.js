// 1. Create array of world cuisines
// 2. Function that loops through array and adds buttons
// 3. Function to create new button from user input
// 4. Funtion to call Giphy and show gifs

$(document).ready(function() {

var topics = ["Japanese", "Mexican", "Indian", "Italian", "Indonesian", "French", "Thai", "Chinese","Turkish", "American"];
var animateImage = [];
var stillImage = [];

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
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + " recipes" + "&api_key=4ZhFPyOy5EBQPz5Z0AnMF4Ew1C7AnjLr&limit=10&lang=en";
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {
		for (i=0; i<10; i++) {
			stillImage[i] = response.data[i].images.fixed_height_still.url;
			animateImage[i] = response.data[i].images.fixed_height.url;
			var imgDiv = $("<div>");
			var imgTag = $("<img>");
			imgTag.attr("src", stillImage[i]);
			imgTag.attr("src2", animateImage[i]);
			imgTag.attr("alt", searchTerm + i);
			imgTag.addClass("image");
			imgDiv.append(imgTag);
			$("#images").append(imgDiv);
		}
	});
};



$(document).on("click", ".cuisine", chooseCuisine);








}); // document.ready()
