
var $ = require("jquery");
var Queue = require("./util/Queue.src");
var debug_func_lifecycle = true;

module.exports = (function() {

	function AudioController(){
		this.queue = new Queue();
		this.isPlaying = false;
		this.fallbackSpeechSynthesis = window.getSpeechSynthesis();
		this.fallbackSpeechSynthesisUtterance = window.getSpeechSynthesisUtterance();
	}
	var p = AudioController.prototype;

	p.pushLine = function pushLine(msg){
		this.queue.enqueue(msg);
		// start playing if not yet started
		if(!this.isPlaying && this.queue.getLength()==1){
			if(debug_func_lifecycle) console.log("new start");
			this.loopStart();
		}
		console.log(this.queue);
	};

	p.loopStart = function loopStart(){
		if(debug_func_lifecycle) console.log("Loop start");

		var _this = this;
		if(!this.queue.isEmpty()){
			console.log(this.queue);
			var msg = this.queue.dequeue();
			var u = new this.fallbackSpeechSynthesisUtterance(msg);
			u.lang = 'en-UK';
			u.volume = 1.0;
			u.rate = 1.0;
			u.onend = onended;
			u.onend = function(event) { console.log('Finished in ' + event.elapsedTime + ' seconds.'); };
			this.fallbackSpeechSynthesis.speak(u);
			this.isPlaying = true;
		}
		function onended(){
			if(debug_func_lifecycle)console.log("ended");

			console.log(this.queue);
			_this.isPlaying = false;
			_this.loopEnd.call(_this);
		}
	};
	p.loopEnd = function loopEnd(){
		var _this = this;
		if(!this.queue.isEmpty()){
			setTimeout(function(){_this.loopStart.call(_this);},500);
		}
	};

	return AudioController;

})();
