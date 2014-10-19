// include

// main
module.exports = (function(){
	var Warrior = {
		name:"Warrior",
		gender:"HE",
		lv:1,
		hp:150,
		attackDamage:40,
		attackSpeed:140,
		skills:[],
		description:[
			"a warrior with a sword. "
		],
		lines:{
			hp:[
				"dying",
				"injured",
				"hurt",
				"healthy"
			],
			attack:[
				"{1} leap into the air and deliver a straight chop into {2}, ",
				"{1} dash across {2} and slice through the side, "
			]
		}
	};
	return Warrior;
})();
