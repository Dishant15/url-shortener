var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:pk', function(req, res, next) {
    var collection = req.db.collection("urls");
    collection.find({"_id":parseInt(req.params.pk,10)}).toArray(function(err,data){
        if(err)throw err;
        res.redirect(data[0].url);
    });
});

router.get('/new/:proto//:url', function(req, res, next) {
    // url checking
    var error = {
        "error":"Wrong url format, make sure you have a valid protocol and real site."
    };
    var validUrl = require('valid-url');
    var in_url = req.params.proto + "//" + req.params.url;
    if (!validUrl.isUri(in_url)){
        res.end(JSON.stringify(error));
        return;
    }
    // get a random no.
    var c = Math.floor(Math.random()*1000);
    var data = {
        "original_url" : in_url,
        "short_url" : "https://req-header-parser-dishant15.c9users.io/" + c.toString(),
    };
    
    
    var collection = req.db.collection("urls");
    collection.insert({"_id":c,"url":in_url}, function(err,result){
        if(err){
            res.end(JSON.stringify(error));
        } else {
            res.end(JSON.stringify(data));
        }
    });
 
});

module.exports = router;
