
//var $ = require("jquery");
var Util = require("./system/util");
var Fighter = require("./creatures/fighter");
var warrior = require("./creatures/players/warrior");
var slime = require("./creatures/monsters/slime");
var PlayerController = require("./creatures/pilots/playerControl");
var AIPacifist = require("./creatures/pilots/aiPacifist");

module.exports = (function() {

	return function createNewBattle(IO){
		var battle = {};
		battle.io = IO;
		battle.start = start;
		battle.nextBeat = nextBeat;
		battle.players = [];
		battle.enemies=[];
		battle.queue = [];
		return battle;
	};

	function start(){
		this.players.push(new Fighter(warrior,new PlayerController(this.io)));
		this.enemies.push(new Fighter(slime,new AIPacifist(this.io)));
		this.queue = this.queue.concat(this.players).concat(this.enemies);
		console.log(this.queue);
		randomizeQueue(this.queue);
		//this.io.line("A wild "+this.enemies[0].getName()+" challenges you!");
		this.io.line(Util.stringReplace(
			"A wild {1} challenges you!",
			this.enemies[0].getName()
		));
		this.queue.sort(Fighter.sortByCooldown);
		console.log(this.queue);
		this.nextBeat();
	}

	function nextBeat(){
		this.queue[0].getNextMove(this);

		this.nextBeat();
	}

	function randomizeQueue(queue){
		queue.forEach(function(element){
			element.state.cooldown = Math.floor(Math.random() * 100);
		});
	}

	

})();
