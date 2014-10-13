// include

// main
module.exports = (function(){
	var Warrior = {
		name:"Warrior",
		lv:1,
		hp:150,
		attackDamage:40,
		attackSpeed:140,
		skills:[],
		description:[
			""
		],
		lines:{
			hp:[
				"dying",
				"injured",
				"hurt",
				"healthy"
			]
		}
	};
	return Warrior;
})();