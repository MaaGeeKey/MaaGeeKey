var ss = require("./system/screenSize");
var $ = require("jquery");
var Game = require("./game");
var IOController = require("./io");

$(function() {
	// bind windows resize to screenSize.js
	$(window).resize(ss);
	// initial run
	ss();

	var output_div=$("#story").get()[0];
	var input_div=$("#action").get()[0];

	var io = IOController(input_div,output_div);

	var game = Game(io);
	window.gm = game;
	game.start(); 

});