var ss = require("./system/screenSize");
var $ = require("jquery");
var Game = require("./game");
var Output = require("./output");

$(function() {
	// bind windows resize to screenSize.js
	$(window).resize(ss);
	// initial run
	ss();

	var div=$("#story").get()[0];
	var output = Output(div);

	var game = Game(output);
	window.gm = game;
	game.start(); 

});