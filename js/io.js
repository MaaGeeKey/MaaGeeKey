
var $ = require("jquery");

module.exports = (function(input_div,output_div) {

	var IOController = {};
	IOController. inputDiv =  input_div;
	IOController.outputDiv = output_div;

	IOController.line = function line(){
		var p = document.createElement("p");
		p.className=" line ";
		p.appendChild(document.createTextNode(arguments[0]));

		this.outputDiv.appendChild(p);
		this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
	};

	/**
	 * ask(question,choices)
	 * ask a question
	 * @param  {string} question an HTML question for player
	 * @param  {array}  choices  array of choices, and their callbacks
	 * @return {bool}            success or not
	 */
	IOController.ask = function ask(question,choices,callback){
		var _this = this;
		// create a <p> with the question
		var div = document.createElement("div");

		var p = document.createElement("p");
		p.innerHTML = question;
		//p.appendChild(document.createTextNode(question));
		div.appendChild(p);

    	var b;
    	for(var i=0; i < choices.length; i++){
	    	b = document.createElement("button");
			b.appendChild(document.createTextNode(choices[i]));
			b.actionLabel=choices[i];
			b.addEventListener("click",buttonClickCallback);
			div.appendChild(b);

		}
		this.inputDiv.appendChild(div);

		function buttonClickCallback(){
			var resolved = callback(this.actionLabel);
			if(resolved){
				_this.inputDiv.removeChild(div);
			}
		}

	};


	return IOController;

});
