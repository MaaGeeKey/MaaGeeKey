// includes
//var $ = require("jquery");
var Util = require("./system/util");

// creature that participate in the fight
var Fighter = require("./creatures/fighter");
var warrior = require("./creatures/players/warrior");
var slime = require("./creatures/monsters/slime");
// pilots
var PlayerController = require("./creatures/pilots/playerControl");
var AIPacifist = require("./creatures/pilots/aiPacifist");

// body
module.exports = (function() {

	function Battle(ioController){
		this.io = ioController;
		this.players = [];
		this.enemies = [];
		this.queue = [];
	}

	var p = Battle.prototype;

	// public methods
	p.start = function start(){
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
		this.nextBeatStart();
	};

	p.nextBeatStart = function nextBeatStart(){
		var _this = this;
		console.log(this.queue[0]);
		this.queue[0].doNextMove(this,function(){
			_this.nextBeatFinish.call(_this);
		});
		//this.nextBeat();
	}
	p.nextBeatFinish = function nextBeatFinish(){
		var _this = this;
		this.queue.sort(Fighter.sortByCooldown);
		var str = "";
		for(var i=0; i < this.queue.length; i++){
			str+=this.queue[i].state.cooldown + " ";
		}
		console.log(str);
		setTimeout(function(){_this.nextBeatStart().call(_this);},500);
	}


	return Battle;

	// private functions
	function randomizeQueue(queue){
		queue.forEach(function(element){
			element.state.cooldown = Math.floor(Math.random() * 100);
		});
	}

	

})();
