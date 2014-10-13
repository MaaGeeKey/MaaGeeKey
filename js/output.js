
var $ = require("jquery");

module.exports = (function(output_div) {

	var Output = {};
	Output.outputDiv = output_div;

	Output.line = function line(msg){
		var p = document.createElement("p");
		p.innerHTML = msg;
		
		this.outputDiv.appendChild(p);

	};


	return Output;

});