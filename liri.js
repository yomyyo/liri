require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var doThis = process.argv[2];

if(doThis == "concert-this"){
    var artist = process.argv[3];
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function(response){
            console.log("this is the respone")
            console.log(response.data[1].venue.name);
            console.log(response.data[1].venue.city);
            console.log(response.data[1].datetime);
        }
    )
}

if(doThis == "movie-this"){
    var movieName = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
          console.log("Movie Title: " + response.data.Title);
          console.log("Release Year: " + response.data.Year);
          console.log("Imbd Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        }
    );
}

if(doThis == "spotify-this-song"){
    var songName = process.argv[3];
    spotify.search({
        type: "track",
        query: songName
    }, function(err, data){
        if(err){
            console.log("error occurred " + err);
        }

        console.log(data.tracks.items[1].album.artists[0].name);
    })
}