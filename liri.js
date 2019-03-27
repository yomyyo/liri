require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var moment = require("moment")

var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var doThis = process.argv[2];

var theName = process.argv.slice(3).join(" ");

function concertThis(){
    if(doThis == "concert-this"){
        var queryURL = "https://rest.bandsintown.com/artists/" + theName + "/events?app_id=codingbootcamp"
        axios.get(queryURL).then(
            function(response){
                console.log("Venue Name: " + response.data[1].venue.name);
                console.log("Venue City: " + response.data[1].venue.city);
                m = moment(response.data[1].datetime)
                console.log("Concert Date: " + m.format("MM-DD-YYYY"));
            }
        )
    }
}

function movieThis(){
    if(doThis == "movie-this"){

        
        if(theName == ""){
            theName = "Mr. Nobody"
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + theName + "&y=&plot=short&apikey=trilogy";

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
}

function spotifyThis(){
    if(doThis == "spotify-this-song"){
        if(theName == ""){
            theName = "The Sign Ace of Base"
        }

        spotify.search({
            type: "track",
            query: theName
        }, function(err, data){
            if(err){
                console.log("error occurred " + err);
            }

            console.log("Artist name: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Song Sample: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name);
        })
    }
}

if(doThis == "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(err, data) {
        dataArr = data.split(",")
        doThis = dataArr[0];
        theName = dataArr[1];

        if(doThis == "spotify-this-song"){
            spotifyThis();
        }

        if(doThis == "movie-this"){
            movieThis();
        }

        if(doThis == "concert-this"){
            concertThis();
        }
    })
}

spotifyThis();

movieThis();

concertThis();