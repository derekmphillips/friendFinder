var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    var compareArray = [];

    for (var i = 0; i < friends.length; i++) {
        var totalDif = 0;
        if (friends[i].name != req.body.name ) {
          for (var j = 0; j < 10; j++) {
            var dif = Math.abs(req.body.scores[j] - friends[i].scores[j]);
            totalDif+= dif;
          };
          compareArray.push({name: friends[i].name,
                              sum: totalDif,
                         photoUrl: friends[i].photoUrl});
        };
    };
    compareArray.sort(mycomparator);

    console.log("Your friend: " + compareArray[0].name );
    var nameObj = {name: compareArray[0].name,
               photoUrl: compareArray[0].photoUrl }
    res.json(nameObj);


  });
};

function mycomparator(a,b) {
    return parseInt(a.sum, 10) - parseInt(b.sum, 10);
  }