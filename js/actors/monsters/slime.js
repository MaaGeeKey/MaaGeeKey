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
	return Slime;
})();