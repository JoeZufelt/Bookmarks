$(document).ready(function(){
    $('.carousel').carousel();

//insert all api's we are utilizing

//call for terms using ajax
    //good reads api key
//    var queryURL = "https://www.goodreads.com/search.xml?" + XXX +"key=RQAh0rQcHphgz1zJoAbq7w&q=Ender%27s+Game"   
    //key: RQAh0rQcHphgz1zJoAbq7w
        //secret: Fcgh3OtLG1nVAiYPmlxXflA2qDODFArgfXtCDvHXKt4
    //google api key 
    // var queryURL ="https://www.googleapis.com/books/v1/" + XXX +"handleResponse"

    // var queryURL ="https://api.nytimes.com/svc/books/v3/lists.json"
    // NYT api key 4x0GxqGa2h5JUfQLcQpyVwHeDLjtsdH0

//   var queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=4x0GxqGa2h5JUfQLcQpyVwHeDLjtsdH0";


//XMLHttpRequest 
// function reqListener(){
//     var data = JSON.parse(this.responseText);
//     console.log(data);
// }

//Basic Fetch request
// function reqError(err) {
//     console.log('Fetch Error :-S', err);
// }
// var oReq = new XMLHttpRequest();
// oReq.onload = reqListener;
// oReq.onerror = reqError;
// oReq.open('get', './api/some.json', true);
// oReq.send();

// fetch('./api/some.json')
//     .then(
//         function(response){
//             if (response.status !== 200) {
//                 console.log('looks like there was a problem. Status Code: ' + response.status);
//                 return;
//             }
//             //Examine the text in the response
//             response.json().then(function(data){
//                 console.log(data);
//             });
//         }
//     )
//     .catch(function(err){
//         console.log('Fetch Error :-S', err);
//     });
//API call using fetch -- above is the prerequisite code for utilizing the fetch method
    fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=4x0GxqGa2h5JUfQLcQpyVwHeDLjtsdH0', {
        method: 'GET',
    })
    .then(response => {return response.json();})
    .then(json => {updateBestSellers(json);})
    // .catch(error => {
        // console.log('NYT API Error: Defaulting to NYTimes archival data.');
        // updateBestSellers(nytimesArchive);

    // });
//insert to carousel here
    function updateBestSellers(nytimesBestSellers){
        nytimesBestSellers.results.forEach(function(book){
            var isbn = book.isbns[0].isbn10;
            console.log(isbn);
        // $('#best-seller-titles').append(book[0].book_details[0].title);
        // $('#' + book.rank).attr('nyt-rank', book.rank);
        var carousel = $("#iDontLikeThis");
        carousel.empty();
        updateCover(book.rank, isbn);
        });
    }
    
    function updateCover(id, isbn){
        fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&key=AIzaSyDpeph5_F4Ntlla0XIBk31jDHfD-2p-l8s', {
            method: 'GET',
        })
        .then(response => {return response.json();})
        .then(data => {
            console.log(data);
            // console.log(data.items[0].volumeInfo.imageLinks.thumbnail)
            if (data.totalItems === 0) return;
            var img = data.items[0].volumeInfo.imageLinks.thumbnail;
            console.log(img)
            // img = img.replace(/^http:\/\//i, 'https://');
            // $('#cover-' + id).attr('src', img);
            // $(".user-book").append("img");

            var carousel = $("#iDontLikeThis");
            // carousel.empty();
            var imageElement = $("<img>");
            imageElement.attr("src", img);
            imageElement.addClass('img-responsive');
            var aTag = $("<a>");
            var isbns = data.items[0].volumeInfo.industryIdentifiers;
            var isbn10;
            isbns.forEach(function(item) {
                if(item.type === "ISBN_10") {
                    isbn10 = item.identifier;
                }
            })
            aTag.attr("href", "https://amazon.com/gp/product/" + isbn10);
            aTag.attr('target', "__BLANK");
            aTag.addClass("carousel-item");
            aTag.append(imageElement)
            aTag.append(data.items[0].volumeInfo.title);
            carousel.append(aTag);
            carousel.carousel();

        })
        .catch(error => {
            console.log(error);
            // console.log('Google API Error: Defaulting to archival images for book #' + id + 'ISBN: ' + isbn);
            // var index = id - 1;
            // var img = archivedImages[index];
            // $('#cover-' + id).attr('src', img);
        });
        

    }
    updateCover()
   
    // $('.carousel').carousel('methodName');
    // $('.carousel').carousel('methodName', paramName);
    
    // $(window).scroll(function (event) {
    //     var scroll = $(window).scrollTop();
    //     if (scroll > 50) {
    //       $('#masthead').css({'height':'50', 'padding' : '8'})
    //       $('#nyt-logo').css({'height':'35'})
    //     } else {
    //       $('#masthead').css({'height':'100', 'padding':'10'});
    //       $('#nyt-logo').css({'height':'80'})
    //     }
    // });

    // Display Meetup Jam

     
    function displayMeetup() {

        var zip = "";
        var key = "4262c23e135a6578766a4f465f3740";
        var radius = "";
        var meetupURL = "https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/groups?&key=" + key + "&sign=true&photo-host=public&zip=" + zip + "&country=us&location=orlando&radius=" + radius + "&category=18&page=20";
        console.log(meetupURL);
        $.ajax({
            url: meetupURL,
            method: "GET",
            dataType: 'JSONP'
        }).then(function(response){
            for (i = 0; i < response.length; i++){
                var meetupDiv = $("<div>");
                var p = $("<p class='newMeetup'>");
                var pLink = $("<a class='newMeetup'>");
                var pName = $("<p class='newMeetup'>");
                pName = response[i].name;
                p = response[i].description;
                pLink = response[i].link;
                meetupDiv.append(pName, p, pLink);
                $("#results").prepend(meetupDiv);
            }
            console.log(response);
        }); // End then
    }; // End displayMeetup
    displayMeetup();

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