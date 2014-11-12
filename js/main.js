// includes
var $ = require("jquery");
var Battle = require("./battle");
var IOController = require("./io");
var AudioController = require("./audioControllerUtterance");
var screenResizeHandler = require("./system/screenSize");
var audioPolyfill = require("./polyfill");
var consoleMirror = require("./consoleMirrorLocal");
var mediaWorkaround  =require("./androidMediaRestrictionsWorkaround");

// entry point of the program
// done on document load
$(function() {
	window.d_console = consoleMirror();
	mediaWorkaround();
	audioPolyfill();
	// bind windows resize to screenSize.js
	$(window).resize(screenResizeHandler);
	// initial run
	screenResizeHandler();

	// retrieve the dom elements
	var output_div=$("#story").get()[0];
	var input_div=$("#action").get()[0];

	var ioController = IOController(input_div,output_div,new AudioController());

	// create a clean battler object
	var battle = new Battle(ioController);
	// expose the battle object to debug
	window.gm = battle;
	battle.start(); 

});