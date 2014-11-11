
var $ = require("jquery");

module.exports = function(input_div,output_div,audioController) {

	var IOController = {};
	IOController. inputDiv =  input_div;
	IOController.outputDiv = output_div;
	IOController.audioController = audioController;

	IOController.line = function line(){
		var p = document.createElement("p");
		p.className=" line ";
		p.appendChild(document.createTextNode(arguments[0]));

		this.outputDiv.appendChild(p);
		this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
		$(p).animate({opacity: 1},500);
		//console.log(this.audioController);
		// play audio through controller
		var audio = new Audio();
		audio.autoPlay = false;
		audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=en&q='+arguments[0];
		audio.rel = 'noreferrer';
		this.audioController.pushLine(audio);
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
			inputResolveFunction.call(this,this.actionLabel);
			_this.inputDiv.removeChild(div);
		}

	};
	


	return IOController;

};
