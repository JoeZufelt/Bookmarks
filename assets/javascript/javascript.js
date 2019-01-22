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
    .then(json => {console.log(json);})
    .catch(error => {
        console.log('NYT API Error: Defaulting to NYTimes archival data.');
        updateBestSellers(nytimesArchive);

    });
//insert to carousel here
    function updateBestSellers(nytimesBestSellers){
        nytimesBestSellers.results.forEach(function(book){
            var isbn = book.isbns[1].isbn10;
            var bookInfo = book.rank_last_week || 'n/a';
            var lastWeekRank = book.rank_last_week || 'n/a';
            var weeksOnList = book.week_on_list || 'New this week!';
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
    function updateCover(id, isbn){
        fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=AIzaSyBTKHDjDKY0IhsQP7RY5KViSUNkxNc5gmc", {
            method: 'get',
        })
        .then(response => {return response.json();})
        .then(data => {
            var img = data.items[0].volumeInfo.imageLinks.thumbnail;
            img = img.replace(/^http:\/\//i, 'https://');
            $('#cover-' + id).attr('src', img);
        })
        .catch(error => {
            console.log(error);
            console.log('Google API Error: Defaulting to archival images for book #' + id + 'ISBN: ' + isbn);
            var index = id - 1;
            var img = archivedImages[index];
            $('#cover-' + id).attr('src', img);
        });

    }
    //insert to carousel here 


