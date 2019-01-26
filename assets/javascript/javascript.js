$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.carousel').carousel();

//API call using fetch -- above is the prerequisite code for utilizing the fetch method
fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=4x0GxqGa2h5JUfQLcQpyVwHeDLjtsdH0', {
    
        method: 'GET',
    })
    .then(response => {return response.json();})
    .then(json => {updateBestSellers(json);})


    
//insert to carousel here
    function updateBestSellers(nytimesBestSellers){
        console.log(nytimesBestSellers);
        var carousel = $("#iDontLikeThis");
        carousel.empty();
        nytimesBestSellers.results.books.forEach(function(book){

            updateCover(book); // only book 
        });
    }
    
    // function pulls cover of book and inserts into carousel
    function updateCover(book){ // change to book 
            console.log(book);

            var img = book.book_image;
            console.log(img);

            var carousel = $("#iDontLikeThis");
            var imageElement = $("<img>");
            imageElement.attr("src", img);
            //makes image responsive
            imageElement.addClass('img-responsive');
            var aTag = $("<a>");
            var isbn10 = book.isbns[0].isbn10;
            //attr pulls book cover from amazon using the isbn10 number
            aTag.attr("href", "https://amazon.com/gp/product/" + isbn10);
            aTag.attr('target', "__BLANK");
            aTag.addClass("carousel-item");
            //adds image and appends to github
            aTag.append(imageElement)
            aTag.append(book.title);
            carousel.append(aTag);
            carousel.carousel();

    }
   

    // Display Meetup Jam

    $("#submit").on("click", function displayMeetup(event) {
        event.preventDefault();
        var zip = $("#zip").val().trim();
        var radius = $("#radius").val().trim();
        var key = "4262c23e135a6578766a4f465f3740";
        var meetupURL = "https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/groups?&key=" + key + "&sign=true&photo-host=public&zip=" + zip + "&country=us&location=orlando&radius=" + radius + "&category=18&page=20";
        console.log(meetupURL);
        $.ajax({
            url: meetupURL,
            method: "GET",
        }).then(function(response){
            for (i = 0; i < response.length; i++){
                $("#zip").val("");
                $("#radius").val("");
                var meetupDiv = $("<div class='meeetupDiv'>");
                var descriptionDiv = $("<div class='newDescription'>");
                var linkDiv = $("<div class='linkDiv'>");
                var newLink = $("<a class='newLink' target='_blank'>");
                var newName = $("<div class='newName'>");
                newName.append(response[i].name);
                descriptionDiv.append(response[i].description);
                newLink.attr("href", response[i].link);
                newLink.html("Learn More");
                linkDiv.append(newLink);
                meetupDiv.append(newName, descriptionDiv, linkDiv);
                $("#results").prepend(meetupDiv);
            }
            console.log(response);
        }); // End then
    }); // End displayMeetup

}); // End Document Ready

var jsoncall = {
    "web": {
        "client_id": "443253864577-d2jcibe4bj6p2h65hdg8vj8cl8ktra6b.apps.googleusercontent.com",
        "project_id": "book-recommender-228801",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "xLDBxEu0tRvNFPNkOE89LIZe",
        "redirect_uris": [
            "https://book-recommender-228801.firebaseapp.com/__/auth/handler"
        ],
        "javascript_origins": [
            "http://localhost",
            "http://localhost:5000",
            "https://book-recommender-228801.firebaseapp.com"
        ]
    }
}

// Category Page Function
$("#search-btn").on("click", function displayCategory() {
    event.preventDefault();
    var category = $("#search").val().trim();
    var categoryURL = "https://www.googleapis.com/books/v1/volumes?q=" + category + "&key=AIzaSyDpeph5_F4Ntlla0XIBk31jDHfD-2p-l8s"
    console.log(categoryURL);

    $.ajax({
        url: categoryURL,
        method: "GET",
    }).then(function(response){
        for (i = 0; i < response.length; i++){
            $("#search").val("");
            var categoryDiv = $("<div class='category'>");
            var bookIMG = $("<img class='bookIMG'>");
            var title = $("<div class='bookTitle'>");
            var author = $("<div class='bookAuthor'>");
            bookIMG.attr("src", response[i].volumeInfo.imageLinks.thumbnail);
            title.append(response[i].volumeInfo.title);
            author.append(response[i].volumeInfo.authors);
            categoryDiv.append(bookIMG, title, author);
            $("#categoryDump").prepend(categoryDiv);
        } // End for loop
        console.log(resposne);
    }) //End then

}); 