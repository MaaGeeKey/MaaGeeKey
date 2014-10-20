
//var $ = require("jquery");
var Util = require("./system/util");
var Fighter = require("./actors/fighter");
var warrior = require("./actors/players/warrior");
var slime = require("./actors/monsters/slime");
var AIPacifist = require("./actors/pilots/aiPacifist");

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
		this.players.push(new Fighter(warrior,new AIPacifist(this.io)));
		this.enemies.push(new Fighter(slime,new AIPacifist(this.io)));
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
			["Inspect","Attack","Guard","Evade","Skills","Use item"],
			function nextBeatCallback(cmd){
				var resolved = false;
				switch(cmd){
					case "Inspect":
					_this.io.line(_this.enemies[0].describe());
					resolved = true;
					break;
					case "Attack":
					var msg = _this.players[0].attack(_this.enemies[0]);
					_this.io.line(msg);
					resolved = true;
					break;
					case "Guard":
					_this.io.line("Cannot guard at the moment. Please choose another action.");
					break;
					case "Evade":
					_this.io.line("Cannot evade at the moment. Please choose another action.");
					break;
					case "Skills":
					_this.io.line("Skill system not ready. Please choose another action.");
					break;
					case "Use item":
					_this.io.line("Item system not ready. Please choose another action.");
					break;
					default:
				}
				return resolved;
			}
		);

	}

	

})();
