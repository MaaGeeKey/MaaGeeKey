
//var $ = require("jquery");
var Fighter = require("./actors/fighter");
var warrior = require("./actors/players/warrior");
var slime = require("./actors/monsters/slime");

module.exports = (function() {

	return function createNewBattle(output){
		var battle = {};
		battle.out = output;
		battle.start = start;
		battle.nextBeat = nextBeat;
		battle.players = [];
		battle.enemies=[];
		return battle;
	};

	function start(){
		this.players.push(new Fighter(warrior));
		this.enemies.push(new Fighter(slime));
		this.out.line("A wild "+this.enemies[0].getName()+" appeared!");
		this.out.line(this.enemies[0].describe());
		this.nextBeat();
	}

	function nextBeat(){ 
		this.out.line("What would you like to do?");

	}

})();