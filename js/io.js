
var $ = require("jquery");

module.exports = function(input_div,output_div) {

	var IOController = {};
	IOController. inputDiv =  input_div;
	IOController.outputDiv = output_div;

	IOController.line = function line(){
		var p = document.createElement("p");
		p.className=" line ";
		p.appendChild(document.createTextNode(arguments[0]));

		this.outputDiv.appendChild(p);
		this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
		$(p).animate({opacity: 1},500);
	};
	IOController.whisper = function whisper(){
		var p = document.createElement("p");
		p.className=" line whisper ";
		p.appendChild(document.createTextNode(arguments[0]));

		this.outputDiv.appendChild(p);
		this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
		$(p).animate({opacity: 1},500);
	};

	/**
	 * ask(question,choices)
	 * ask a question
	 * @param  {string} question an HTML question for player
	 * @param  {array}  choices  array of choices, and their callbacks
	 * @return {bool}            success or not
	 */
	IOController.ask = function ask(question,choices,inputResolveFunction,finishedCallback){
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
			var resolved = inputResolveFunction.call(this,this.actionLabel);
			if(resolved){
				_this.inputDiv.removeChild(div);
				finishedCallback.call(this);
			}
		}

	};
	


	return IOController;

};
