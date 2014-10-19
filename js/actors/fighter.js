// include

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
	p.getHPDescriptor = function getHPDescriptor(){
		var hpPercent = this.getHP() / this.getHPMAX();
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
	

	return Fighter;
})();