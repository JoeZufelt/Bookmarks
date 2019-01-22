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

//create functions to update call objects through api
    //.on("click") function will trigger the AJAX Call

    // event.preventDefault() used to prevent an event's default behavior.

//grab the text from the input box
    //function to create call for what is searched 

//create variables for calls relating to any of the clickdown menu items
    //create functions to roll back through to api depending on which topic is being viewed

//create firebase link to database
    //deploy authentication for users to log in and save searches

{/* <script src="https://www.gstatic.com/firebasejs/5.7.3/firebase.js"></script> */}

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBnnONv0-z4QCqBoRTSaZ6uLM0i-8VVKvc",
    authDomain: "book-recommender-228801.firebaseapp.com",
    databaseURL: "https://book-recommender-228801.firebaseio.com",
    projectId: "book-recommender-228801",
    storageBucket: "book-recommender-228801.appspot.com",
    messagingSenderId: "443253864577"
  };
  firebase.initializeApp(config);

//link over to html
    //add text where needed
    //reset search
    //store recent searches with local storage and database(firebase)

    // var nytimesKey = config.'4x0GxqGa2h5JUfQLcQpyVwHeDLjtsdH0';
    // var googleBooksKey = config.AIzaSyBTKHDjDKY0IhsQP7RY5KViSUNkxNc5gmc;
    
    fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=' + '4x0GxqGa2h5JUfQLcQpyVwHeDLjtsdH0', {
        method: 'get',
      })
      .then(response => { return response.json(); })
      .then(json => { 
        updateBestSellers(json); 
        console.log(json);
      })
      .catch(error => {
        console.log('NYT API Error: Defaulting to nytimes archival data.');
        updateBestSellers(nytimesArchive);
      });
    
    function updateBestSellers(nytimesBestSellers) {
      nytimesBestSellers.results.forEach(function(book) {
        var isbn = book.isbns[1].isbn10;
        var bookInfo = book.book_details[0];
        var lastWeekRank = book.rank_last_week || 'n/a';
        var weeksOnList = book.weeks_on_list || 'New this week!';
        var listing = 
            '<div id="' + book.rank + '" class="entry">' + 
              '<p>' + 
              '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="book-cover" id="cover-' + book.rank + '">' + 
              '</p>' + 
              '<h2><a href="' + book.amazon_product_url + '" target="_blank">' + bookInfo.title + '</a></h2>' +
              '<h4>By ' + bookInfo.author + '</h4>' +
              '<h4 class="publisher">' + bookInfo.publisher + '</h4>' +
              '<p>' + bookInfo.description + '</p>' + 
              '<div class="stats">' +
                '<hr>' + 
                '<p>Last Week: ' + lastWeekRank + '</p>' + 
                '<p>Weeks on list: ' + weeksOnList + '</p>' +
              '</div>' +
            '</div>';
    
        $('#best-seller-titles').append(listing);
        $('#' + book.rank).attr('nyt-rank', book.rank);
    
        updateCover(book.rank, isbn);
      });
    }
    
    function updateCover(id, isbn) {
      fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=" + AIzaSyBTKHDjDKY0IhsQP7RY5KViSUNkxNc5gmc, {
        method: 'get'
      })
      .then(response => { return response.json(); })
      .then(data => {
        var img = data.items[0].volumeInfo.imageLinks.thumbnail;
        img = img.replace(/^http:\/\//i, 'https://');
        $('#cover-' + id).attr('src', img);
      })
      .catch(error => {
        console.log(error);
        console.log('Googel API Error: Defaulting to archival images for book #' + id + ' ISBN: ' + isbn);
        var index = id - 1;
        var img = archivedImages[index];
        $('#cover-' + id).attr('src', img);
      });
    }
    
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
          $('#masthead').css({'height':'50', 'padding' : '8'})
          $('#nyt-logo').css({'height':'35'})
        } else {
          $('#masthead').css({'height':'100', 'padding':'10'});
          $('#nyt-logo').css({'height':'80'})
        }
    });

    // Display Meetup Jam
    function displayMeetup() {

        var zip = "32821";
        var key = "4262c23e135a6578766a4f465f3740";
        var meetupURL = "https://api.meetup.com/find/groups?&key=" + key + "&sign=true&photo-host=public&zip=" + zip + "&country=us&location=orlando&radius=50&category=18&page=20";
        console.log(meetupURL);
        $.ajax({
            url: meetupURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            console.log(results);
        }); // End then
    }; // End displayMeetup
    displayMeetup();

}); // End Document Ready