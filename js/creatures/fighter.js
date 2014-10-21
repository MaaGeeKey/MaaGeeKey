// include
var Util = require("../system/util");

// main
module.exports = (function(){
	function Fighter(base,pilot,options){
		if(pilot == null) throw new Error("No pilot specified for '"+base.name+"'");
		if(options){
			Util.mergeDefault(options,{
				overrideStat:null
			});
		}
		this._name = base.name;
		this.base = base;
		this.state = {
			hp:this.base.hp,
			cooldown:0
		};
		this.pilot = pilot;
		this.pilot.fighter = this;
	}

	// static functions and variables
	Fighter.sortByCooldown = function sortByCooldown(a,b){
		// returns positive if b comes before a
		return a.state.cooldown - b.state.cooldown;
	};

	// public variable
	var p = Fighter.prototype;
	p.getHP = function getHP(){
		return this.state.hp;
	};
	p.getHPMAX = function getHPMAX(){
		return this.base.hp;
	};
	p.getHPPercent = function getHPPercent(){
		return this.getHP() / this.getHPMAX();
	};
	p.getHPDescriptor = function getHPDescriptor(){
		var hpPercent = this.getHPPercent();
		var lineID = Math.floor((this.base.lines.hp.length-1) * hpPercent);
		return this.base.lines.hp[lineID];
	};
	p.getSkills = function getSkills(){
		return this.base.skills;
	};
	p.getName = function getName(){
		return this.base.name;
	};
	p.getDescription = function getDescription(){
		return this.base.description;
	};
	p.describe = function describe(){
		var str = this.getName();
		str+=" is "+ this.getDescription();
		str+="\nIt looks "+ this.getHPDescriptor();
		return str;
	};
	p.getAttackLine = function getAttackLine(){
		var i = Math.floor(Math.random() * this.base.lines.attack.length);
		return this.base.lines.attack[i];
	};
	p.nextMove = function doNextMove(game){
		// do not modify the game state
		this.pilot.nextMove(game);
	};
	p.attack = function attack(target){
		// basic attack
		var msg = Util.stringReplace(
			this.getAttackLine(),
			"You",
			"the "+target.getName()
		);
		var damage = this.base.attackDamage * Util.getRandomDamageModifier();

		if(damage >= target.state.hp){ // killing
			if(target.getHPPercent()==1){
				msg+="instantly defeating it.";
			}else{
				msg+="and you defeated it.";
			}
		}else{ // damaging
			var attackDamageRatio = damage / target.state.hp;
			if(attackDamageRatio>=0.5){
				msg+="dealing a massive blow at it.";
			}else if (attackDamageRatio>=0.1){
				msg+="dealing some damage to it.";
			}else{
				msg+="but it was not very effective.";
			}
		}

		target.state.hp -= damage;

		return msg;
	};

	return Fighter;

})();
