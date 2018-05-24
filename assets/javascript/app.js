
var topics = ["Lebron James", "John Stockton", "Karl Malone",
    "Michael Jordan"];


function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var btn = $("<button>");
        // Adds a class of movie to our button
        btn.addClass("search-text");
        // Added a data-attribute
        btn.attr("data-name", topics[i]);
        // Provided the initial button text
        btn.text(topics[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(btn);
        addClickListenerToButton(btn);
    }
}


$("#add-athlete").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var athletes = $("#athlete-input").val().trim();

    // The movie from the textbox is then added to our array
    topics.push(athletes);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});
renderButtons();

function addClickListenerToButton(button) {
    button.on("click", function () {
        var athlete = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            athlete + "&api_key=CQO30px6uy8a3YOVCTVh0sjPinVXbWkf&limit=10&rating=pg13";
            console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var newDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                console.log(rating);
                var giphyImage = $("<img>");
                giphyImage.attr("src", results[i].images.fixed_height.url);
                giphyImage.attr("alt", "athlete");
                newDiv.append(p, giphyImage);
                $("#athletes-view").prepend(newDiv);
            }

        });
    });
}
