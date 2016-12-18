var express = require('express');
var packageJSON = require('./../config/packageJSON.js');
var Burger = require('./../models/')["Burger"];
Burger.sequelize.sync({force: true}).then(function () {
	Burger.create({burger_name: "Test Burger"}).then(function(results) {
		Burger.create({burger_name: "Test Burger"}).then(function(results) {
			Burger.create({burger_name: "Test Burger"}).then(function(results) {
			});
		});
	});
});
/***
  `burgers_controller.js` file includes the html route for serving the
	webpage and api routes for client side interaction with the database:
  	1. A GET Route to `/` which displays the index page.
  	2. A POST Route to `/burgers` which creates a burger in the database.
    3. A PUT Route to `/burgers` which updates a burger in the database.
***/
module.exports = function (router, path) {
	// Home Page
	router.get('/', function(req,res) {
		// mysql> SELECT * FROM burgers;
		Burger.findAll().then(function(burgerData) {
			// render the index view with the data from our database
			res.render('index', {
				appInfo: packageJSON.settings,
				burger: burgerData
			});
		});
	});
	// POST: api route to post a burger to the database
	router.post('/burger', function(req, res) {
		// mysql> INSERT INTO burgers (burger_name) VALUES ( ? );
		Burger.create({burger_name: req.body.burger_name}).then(function(results) {
			// reload the index route
			res.redirect('/');
		});
	});
	// PUT: api route to update a burger in the database
	router.put('/devoured', function(req,res) {
		// select burger from id
		Burger.findOne({where: {id: req.body.burger_id}}).then(function(result) {
			// update the devoured attribute to true
			return result.updateAttributes({devoured: true}).then(function() {
				// reload the index route
				res.redirect('/');
			});
		});
	});
}
