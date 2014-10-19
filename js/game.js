
//var $ = require("jquery");
var Util = require("./system/util");
var Fighter = require("./actors/fighter");
var warrior = require("./actors/players/warrior");
var slime = require("./actors/monsters/slime");

module.exports = (function() {

	return function createNewBattle(IO){
		var battle = {};
		battle.io = IO;
		battle.start = start;
		battle.nextBeat = nextBeat;
		battle.players = [];
		battle.enemies=[];
		return battle;
	};

	function start(){
		this.players.push(new Fighter(warrior));
		this.enemies.push(new Fighter(slime));
		this.players.concat(this.enemies).forEach(function(element){
			element.state.cooldown=0;
		});
		//this.io.line("A wild "+this.enemies[0].getName()+" challenges you!");
		this.io.line(Util.stringReplace(
			"A wild {1} challenges you!",
			this.enemies[0].getName()
		));
		this.nextBeat();
	}

	function nextBeat(){
		var _this = this;
		this.io.ask(
			"What would you like to do?",
			["Inspect","Attack","Defence","Evade","Parry",],
			function nextBeatCallback(cmd){
				switch(cmd){
					case "Inspect":
					_this.io.line(_this.enemies[0].describe());
					break;
					case "Attack":
					var msg = _this.players[0].attack(_this.enemies[0]);
					_this.io.line(msg);
					break;
					case "Defence":
					
					break;
					case "Evade":
					break;
					case "Parry":
					break;
					default:
				}
			}
		);

	}

	

})();
