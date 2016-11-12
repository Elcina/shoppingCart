'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost:27017/shop_db');

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var Item = mongoose.model('Items', {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: false
    }
});

/*var Options = new mongoose.schema({
 description: String,
 price: Number
 });*/

app.get('/api/items', function (req, res) {
    // use mongoose to get all items in the database
    Item.find(function (err, items) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);
        res.json(items); // return all items in JSON format
    });
});

// create item
app.post('/api/items', function (req, res) {

    // create a item, information comes from AJAX request from Angular
    Item.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        picture: req.body.picture
    }, function (err, item) {
        if (err)
            res.send(err);

        // get and return all the items after you create another
        Item.find(function (err, items) {
            if (err)
                res.send(err);
            res.json(items);
        });
    });

});

// delete an item
app.delete('/api/items/:item_id', function (req, res) {
    Item.remove({
        _id: req.params.item_id
    }, function (err, item) {
        if (err)
            res.send(err);

        // get and return all the items after you create another
        Item.find(function (err, items) {
            if (err)
                res.send(err)
            res.json(items);
        });
    });
});

app.get('/', function (req, res) {
    res.sendFile('main.html', {'root': __dirname + '/public'});
});

app.listen('3000', function () {
    console.log('Server running at http://localhost:3000 !!')
})