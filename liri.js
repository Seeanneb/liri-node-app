var twitterKeys = require("./key.js");
var request = require('request');
var Twitter = require('twitter-js-client').Twitter;
var SpotifyWebApi = require('spotify-web-api-node');
var inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'list',
    name: 'app',
    message: 'What do you want to use?',
    choices: [
      'Twitter',
      'Spotify',
    ]
  },
  {
    type: "input",
    name: "search",
    message: "What would you like to lookup?"
  }
  ]).then(function(answer) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
if (answer.app === "Twitter") {
        var callTwitter = function(){

    var config = {
        consumerKey: '8wWKsBn7r46iAehkPIi96l5jd',
        consumerSecret: 'vNk9KoSpesUeF2XOrmzQ8JVR45WeO7frwDctuuOP1cFLBTsV5B',
        accessToken: '73548368-9T7ZIZXo0zM1XIjwZl9IRe6Ay4fQK912haLjXPJYA',
        accessTokenSecret: 'OHaqhgKdhWyF2tDnjj0xtETTfgZqPoKaOWTRj8dEMQnbD'
        // callBackUrl: "XXX"
    };

    var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);
        
    };   
    var twitter = new Twitter(config);
    
    twitter.getUserTimeline({ screen_name: answer.search, count: '1', text: " "}, error, success);
    success()
    }
        callTwitter();
    }
if (answer.app === "Spotify") {
        var callSpotify = function(){
   // "GET https://api.spotify.com/v1/search"
    var clientID = "7e737a7c865d4642b508e4e000945969"
    var clientSecret = "25a9887a22fc4f77b61b5db64c785889"
    var redirect = "http://localhost:8888/callback"

    var spotifyApi = new SpotifyWebApi();

    spotifyApi.searchTracks(answer.search, function(err, data) {
    if (err) {
    console.error('Something went wrong', err.message);
    return;
    }
    console.log('I got ' + data.body.tracks.total + ' results!');
    var firstPage = data.body.tracks.items;
    console.log('The tracks in the first page are.. (popularity in parentheses)');
    firstPage.forEach(function(track, index) {
    console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
      });
    });
   }
        callSpotify();
}
});



