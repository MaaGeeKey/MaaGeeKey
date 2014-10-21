//var $ = require("jquery");
//var Config = require("../config");
module.exports = (function (){
	function AIPacifist(io){
		this.fighter = null;
		this.io = io;
	}
	var p = AIPacifist.prototype;

	/**
	 * perform the next move either by AI or by player
	 * @param  {Battle} gameState [description]
	 * @return {[type]}           [description]
	 */
	p.nextMove = function nextMove(gameState,finishedCallback){
		this.io.line(this.fighter.base.name+"does nothing.");
		this.fighter.state.cooldown+=this.fighter.base.attackSpeed;
		finishedCallback();
	};


	return AIPacifist;
})();
