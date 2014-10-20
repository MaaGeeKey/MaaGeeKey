//var $ = require("jquery");
//var Config = require("../config");
module.exports = (function (){
	function PlayerControl(io){
		this.io = io;
	}
	var p = PlayerControl.prototype;

	p.nextMove = function nextMove(resolvedCallback){
		this.io.line("does nothing.");
		resolvedCallback();
	};


	return PlayerControl;
})();
