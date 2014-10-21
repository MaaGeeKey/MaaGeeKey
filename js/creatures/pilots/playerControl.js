//var $ = require("jquery");
//var Config = require("../config");

var Battle = require("../../game");

module.exports = (function (){
	function PlayerControl(io){
		this.fighter = null;
		this.io = io;
	}
	var p = PlayerControl.prototype;

	/**
	 * perform the next move either by AI or by player
	 * @param  {Battle} gameState [description]
	 * @return {[type]}           [description]
	 */
	p.nextMove = function nextMove(gameState){
		var _this = this;
		this.io.ask(
			"What would you like to do?",
			["Inspect","Attack","Guard","Evade","Skills","Use item"],
			nextBeatCallback,
			function(){finishedCallback.call(caller);}
		);
		function nextBeatCallback(cmd){
			var resolved = false;
			switch(cmd){
			case "Inspect":
				_this.io.line(gameState.enemies[0].describe());
				resolved = true;
				break;
			case "Attack":
				var msg = this.fighter.attack(gameState.enemies[0]);
				_this.io.line(msg);
				resolved = true;
				break;
			case "Guard":
				_this.io.whisper("Cannot guard at the moment. Please choose another action.");
				break;
			case "Evade":
				_this.io.whisper("Cannot evade at the moment. Please choose another action.");
				break;
			case "Skills":
				_this.io.whisper("Skill system not ready. Please choose another action.");
				break;
			case "Use item":
				_this.io.whisper("Item system not ready. Please choose another action.");
				break;
			default:
			}
			return resolved;
		}
	};


	return PlayerControl;
})();
