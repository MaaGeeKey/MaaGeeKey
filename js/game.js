
//var $ = require("jquery");

module.exports = (function() {

	return function createNewBattle(output){
		var battle = {};
		battle.Out = output;
		battle.start = start;
		battle.nextBeat = nextBeat;
		//battle.
		return battle;
	};

	function start(){
		this.Out.line("A wild Slime appeared!");
	}

	function nextBeat(){

	}

})();