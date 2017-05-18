var express = require('express');
var unirest = require('unirest');
var events = require('events');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var app = express();
var schedule = require('./models/schedule');
app.use(bodyParser.json());
app.use(express.static('public'));


var stationsArray = [
    ]

var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};

//// external API call
//var getFromActive = function(searchTerm) {
//    var emitter = new events.EventEmitter();
//    //console.log("inside getFromActive function");
//    unirest.get("http://api.amp.active.com/v2/search?topicName=Running&registerable_only=true&category=races&attributeValue=5k&sort=date_asc&per_page=24&near="+searchTerm+",US&radius=50&api_key=2e4ra5w6b9augfrn54vjb4bx")
//        .header("Accept", "application/json")
//        .end(function(result) {
//        //console.log(result.status, result.headers, result.body);
//        //success scenario
//        if (result.ok) {
//            emitter.emit('end', result.body);
//        }
//        //failure scenario
//        else {
//            emitter.emit('error', result.code);
//        }
//    });
//
//    return emitter;
//};

var getFromBart = function (searchTerm) {
    var emitter = new events.EventEmitter();
    //console.log("inside getFromActive function");
    // These code snippets use an open-source library. http://unirest.io/nodejs
    unirest.get("https://community-bart.p.mashape.com/sched.aspx?cmd=depart&b=0&a=4&dest=woak&orig=ucty&json=y ")
        .header("X-Mashape-Key", "poOJuuOnJ6mshQZP2u4lJ6vdAISUp1ob0hnjsnif57TGxBXMwj")
        //        .header("Accept", "text/plain")
        .header("Accept", "application/json")
        .end(function (result) {

            //console.log(result.status, result.headers, result.body);
            //success scenario
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.status);
            }
            console.log(result.status, result.headers, result.body);
        });

    return emitter;
};


// local API endpoints
app.get('/schedule/:name', function (req, res) {


    //    external api function call and response

    var searchReq = getFromBart(req.params.name);

    //get the data from the first api call
    searchReq.on('end', function (item) {
        res.json(item);
    });

    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

});




app.post('/add-to-favorites', function (req, res) {

    //db connection and data queries
    schedule.create({
        name: req.body.name,
        date: req.body.date,
        place: req.body.place,
        url: req.body.url
    }, function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.get('/populate-favorites', function (req, res) {
    schedule.find(function (err, item) {
        console.log(item);
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    });
});

app.delete('/delete-favorites/:favoritesId', function (req, res) {
    schedule.findByIdAndRemove(req.params.favoritesId, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(201).json(items);
    });
});



exports.app = app;
exports.runServer = runServer;

app.listen(3001);
