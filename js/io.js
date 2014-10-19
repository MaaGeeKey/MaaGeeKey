
var $ = require("jquery");

module.exports = (function(input_div,output_div) {

	var IOController = {};
	IOController. inputDiv =  input_div;
	IOController.outputDiv = output_div;

	IOController.line = function line(){
		var p = document.createElement("p");
		p.appendChild(document.createTextNode(arguments[0]));

		this.outputDiv.appendChild(p);
	};

	/**
	 * ask(question,choices)
	 * ask a question
	 * @param  {string} question an HTML question for player
	 * @param  {array}  choices  array of choices, and their callbacks
	 * @return {bool}            success or not
	 */
	IOController.ask = function ask(question,choices,callback){
		// create a <p> with the question
		var d = document.createElement("div");

		var p = document.createElement("p");
		p.innerHTML = question;
		//p.appendChild(document.createTextNode(question));
		this.inputDiv.appendChild(p);

    	var b;
    	for(var i=0; i < choices.length; i++){
	    	b = document.createElement("button");
			b.appendChild(document.createTextNode(choices[i]));
			b.buttonIndex=i;
			b.addEventListener("click",function(){
				callback(this.buttonIndex);
			});
			this.inputDiv.appendChild(b);

			// escape the closure property of variable i
			// tell button b to call callback with parameters
			/*
			(function(a){
				b.addEventListener("click",function(){
					callback(a);
				});
			})(i);
			*/
		}

	};


	return IOController;

});
