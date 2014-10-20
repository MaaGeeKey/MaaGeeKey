//var $ = require("jquery");
//var Config = require("../config");
module.exports = (function (){
	function AIPacifist(io){
		this.fighter = null;
		this.io = io;
	}
	var p = AIPacifist.prototype;

	p.nextMove = function nextMove(){
		var resolved = false;
		this.io.line(this.fighter.base.name+"does nothing.");
		resolved = true;
		return resolved;
	};


	return AIPacifist;
})();
