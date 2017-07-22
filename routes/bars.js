var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var config = require('../config');

/* Passthrough for the Yelp endpoints */
router.get('/', function(req, res, next) {
    var url = "https://api.yelp.com/v3/businesses/search";
    var city = req.query.city;
    var radius = req.query.radius;
    var token = 'h84t56A4UT8slVgx4jyccid_aTzll01qWD6uujq3xp0TZjl8beZhhl2YPKC2A1QsptFb2a3jyzQLLkfe2xuuPuFksvJEfaJd1EokjQ-09C2K4n6kVho9UJucDNb0WHYx';
    var Request = unirest
        .get(url)
        .headers({'authorization':'Bearer ' + token})
        .query({
            term:'bar',
            location:city,
            radius:radius
        });

    Request.end(function(response){
        console.log(response);
        res.json(response.body);
    });

});

module.exports = router;
