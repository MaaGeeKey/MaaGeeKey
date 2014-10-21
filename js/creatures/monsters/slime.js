// include

// main
module.exports = (function(){
	var Slime = {
		name:"Slime",
		gender:"IT",
		lv:1,
		hp:100,
		attackDamage:50,
		attackSpeed:100,
		skills:[],
		description:[
			"a common creature among the woods. It is not dangerous at all."
		],
		lines:{
			hp:[
				"dying",
				"heavily injured",
				"injured",
				"badly hurt",
				"hurt",
				"quite hurt",
				"not so healthy",
				"healthy"
			],
			attack:[
				"{1} leap into the air and deliver a straight chop into {2}, ",
				"{1} dash across {2} and slice through the side, "
			]
		}
	};
	return Slime;
})();