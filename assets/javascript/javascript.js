$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.carousel').carousel();

    var nyt_meatball = "4x0GxqGa2h5JUfQLcQpyVwHeDLjtsdH0";

//API call using fetch -- above is the prerequisite code for utilizing the fetch method
fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=' + nyt_meatball, {
    
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
        var meetup_meatball = "4262c23e135a6578766a4f465f3740";
        var meetupURL = "https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/groups?&key=" + meetup_meatball + "&sign=true&photo-host=public&zip=" + zip + "&country=us&location=orlando&radius=" + radius + "&category=18&page=20";
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
            "https://localhost",
            "https://localhost:5000",
            "https://book-recommender-228801.firebaseapp.com"
        ]
    }
}

// Category Page Function
$("#search-btn").on("click", function displayCategory() {
    event.preventDefault();
    var category = $("#search").val().trim();
    var google_meatball = "AIzaSyDpeph5_F4Ntlla0XIBk31jDHfD-2p-l8s";
    var categoryURL = "https://www.googleapis.com/books/v1/volumes?q=genre=" + category + "&key=" + google_meatball
    console.log(categoryURL);

    $.ajax({
        url: categoryURL,
        method: "GET",
    }).then(function(response){
        // for (i = 0; i < items[i].length; i++){
        //     $("#search").val("");
        //     var categoryDiv = $("<div class='category'>");
        //     var bookIMG = $("<img class='bookIMG'>");
        //     var title = $("<div class='bookTitle'>");
        //     var author = $("<div class='bookAuthor'>");
        //     bookIMG.attr("src", response.items[i].volumeInfo.imageLinks.thumbnail);
        //     title.append(response.items[i].volumeInfo.title);
        //     author.append(response.items[i].volumeInfo.authors);
        //     categoryDiv.append(bookIMG, title, author);
        //     $("#dump").prepend(categoryDiv);
        // } // End for loop
        $("#search").val("");
        $("#dump").html("");
            var categoryDiv0 = $("<div class='category'>");
            var bookIMG0 = $("<img class='bookIMG'>");
            var title0 = $("<div class='bookTitle'>");
            var author0 = $("<div class='bookAuthor'>");
            bookIMG0.attr("src", response.items[0].volumeInfo.imageLinks.thumbnail);
            title0.append(response.items[0].volumeInfo.title);
            author0.append(response.items[0].volumeInfo.authors);
            categoryDiv0.append(bookIMG0, title0, author0);
            $("#dump").append(categoryDiv0);
            var categoryDiv1 = $("<div class='category'>");
            var bookIMG1 = $("<img class='bookIMG'>");
            var title1 = $("<div class='bookTitle'>");
            var author1 = $("<div class='bookAuthor'>");
            bookIMG1.attr("src", response.items[1].volumeInfo.imageLinks.thumbnail);
            title1.append(response.items[1].volumeInfo.title);
            author1.append(response.items[1].volumeInfo.authors);
            categoryDiv1.append(bookIMG1, title1, author1);
            $("#dump").append(categoryDiv1);
            var categoryDiv2 = $("<div class='category'>");
            var bookIMG2 = $("<img class='bookIMG'>");
            var title2 = $("<div class='bookTitle'>");
            var author2 = $("<div class='bookAuthor'>");
            bookIMG2.attr("src", response.items[2].volumeInfo.imageLinks.thumbnail);
            title2.append(response.items[2].volumeInfo.title);
            author2.append(response.items[2].volumeInfo.authors);
            categoryDiv2.append(bookIMG2, title2, author2);
            $("#dump").append(categoryDiv2);
            var categoryDiv3 = $("<div class='category'>");
            var bookIMG3 = $("<img class='bookIMG'>");
            var title3 = $("<div class='bookTitle'>");
            var author3 = $("<div class='bookAuthor'>");
            bookIMG3.attr("src", response.items[3].volumeInfo.imageLinks.thumbnail);
            title3.append(response.items[3].volumeInfo.title);
            author3.append(response.items[3].volumeInfo.authors);
            categoryDiv3.append(bookIMG3, title3, author3);
            $("#dump").append(categoryDiv3);
            var categoryDiv4 = $("<div class='category'>");
            var bookIMG4 = $("<img class='bookIMG'>");
            var title4 = $("<div class='bookTitle'>");
            var author4 = $("<div class='bookAuthor'>");
            bookIMG4.attr("src", response.items[4].volumeInfo.imageLinks.thumbnail);
            title4.append(response.items[4].volumeInfo.title);
            author4.append(response.items[4].volumeInfo.authors);
            categoryDiv4.append(bookIMG4, title4, author4);
            $("#dump").append(categoryDiv4);
            var categoryDiv5 = $("<div class='category'>");
            var bookIMG5 = $("<img class='bookIMG'>");
            var title5 = $("<div class='bookTitle'>");
            var author5 = $("<div class='bookAuthor'>");
            bookIMG5.attr("src", response.items[5].volumeInfo.imageLinks.thumbnail);
            title5.append(response.items[5].volumeInfo.title);
            author5.append(response.items[5].volumeInfo.authors);
            categoryDiv5.append(bookIMG5, title5, author5);
            $("#dump").append(categoryDiv5);
            var categoryDiv6 = $("<div class='category'>");
            var bookIMG6 = $("<img class='bookIMG'>");
            var title6 = $("<div class='bookTitle'>");
            var author6 = $("<div class='bookAuthor'>");
            bookIMG6.attr("src", response.items[6].volumeInfo.imageLinks.thumbnail);
            title6.append(response.items[6].volumeInfo.title);
            author6.append(response.items[6].volumeInfo.authors);
            categoryDiv6.append(bookIMG6, title6, author6);
            $("#dump").append(categoryDiv6);
            var categoryDiv7 = $("<div class='category'>");
            var bookIMG7 = $("<img class='bookIMG'>");
            var title7 = $("<div class='bookTitle'>");
            var author7 = $("<div class='bookAuthor'>");
            bookIMG7.attr("src", response.items[7].volumeInfo.imageLinks.thumbnail);
            title7.append(response.items[7].volumeInfo.title);
            author7.append(response.items[7].volumeInfo.authors);
            categoryDiv7.append(bookIMG7, title7, author7);
            $("#dump").append(categoryDiv7);
            var categoryDiv8 = $("<div class='category'>");
            var bookIMG8 = $("<img class='bookIMG'>");
            var title8 = $("<div class='bookTitle'>");
            var author8 = $("<div class='bookAuthor'>");
            bookIMG8.attr("src", response.items[8].volumeInfo.imageLinks.thumbnail);
            title8.append(response.items[8].volumeInfo.title);
            author8.append(response.items[8].volumeInfo.authors);
            categoryDiv8.append(bookIMG8, title8, author8);
            $("#dump").append(categoryDiv8);
            var categoryDiv9 = $("<div class='category'>");
            var bookIMG9 = $("<img class='bookIMG'>");
            var title9 = $("<div class='bookTitle'>");
            var author9 = $("<div class='bookAuthor'>");
            bookIMG9.attr("src", response.items[9].volumeInfo.imageLinks.thumbnail);
            title9.append(response.items[9].volumeInfo.title);
            author9.append(response.items[9].volumeInfo.authors);
            categoryDiv9.append(bookIMG9, title9, author9);
            $("#dump").append(categoryDiv9);
        console.log(response);
    }) //End then

}); // End Category Function
}); // End Document Ready