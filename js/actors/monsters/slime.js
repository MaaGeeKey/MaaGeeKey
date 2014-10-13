// include

// main
module.exports = (function(){
	var Slime = {
		name:"Slime",
		lv:1,
		hp:100,
		attackDamage:50,
		attackSpeed:100,
		skills:[],
		description:[
			"a common creature among the woods. It is not dangerous at all."
		],
		descriptor:{
			hp:[
				"dying",
				"injured",
				"hurt",
				"healthy"
			]
		}
	};
	return Slime;
})();