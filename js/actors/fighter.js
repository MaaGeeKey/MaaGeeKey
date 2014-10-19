// include
var Util = require("../system/util");

// main
module.exports = (function(){
	function Fighter(data,override){
		this._name = data.name;
		this.data = data;
		this.state = {
			hp:this.data.hp,
			cooldown:0
		};
	}

	// public vaariable
	var p = Fighter.prototype;
	p.getHP = function getHP(){
		return this.state.hp;
	};
	p.getHPMAX = function getHPMAX(){
		return this.data.hp;
	};
	p.getHPPercent = function getHPPercent(){
		return this.getHP() / this.getHPMAX();
	};
	p.getHPDescriptor = function getHPDescriptor(){
		var hpPercent = this.getHPPercent();
		var lineID = Math.floor((this.data.descriptor.hp.length-1) * hpPercent);
		return this.data.descriptor.hp[lineID];
	};
	p.getSkills = function getSkills(){
		return this.data.skills;
	};
	p.getName = function getName(){
		return this.data.name;
	};
	p.getDescription = function getDescription(){
		return this.data.description;
	};
	p.describe = function describe(){
		var str = this.getName();
		str+=" is "+ this.getDescription();
		str+="\nIt looks "+ this.getHPDescriptor();
		return str;
	};
	p.getAttackLine = function getAttackLine(){
		var i = Math.floor(Math.random() * this.data.lines.attack.length);
		return this.data.lines.attack[i];
	};
	p.attack = function attack(target){
		var msg = Util.stringReplace(
			this.getAttackLine(),
			"You",
			"the "+target.getName()
		);
		var damage = this.data.attackDamage * Util.getRandomDamageModifier();

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
			}else if (attackDamageRatio>=0.2){
				msg+="dealing significant damage to it.";
			}else{
				msg+="and it was not very effective.";
			}
		}

		target.state.hp -= damage;

		return msg;
	};

	return Fighter;

})();
