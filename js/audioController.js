
var $ = require("jquery");
var Queue = require("./util/Queue.src");
var debug_func_lifecycle = false;

module.exports = (function() {

	function AudioController(){
		this.queue = new Queue();
		this.isPlaying = false;
	}
	var p = AudioController.prototype;

	p.pushLine = function pushLine(HTML5Audio){
		this.queue.enqueue(HTML5Audio);
		if(!this.isPlaying && this.queue.getLength()==1){
			if(debug_func_lifecycle) console.log("new start");

			this.loopStart();
		}
	};

	p.loopStart = function loopStart(){
		if(debug_func_lifecycle) console.log("Loop start");

		var _this = this;
		if(!this.queue.isEmpty()){
			var HTML5Audio = this.queue.peek();
			if(HTML5Audio.readyState == 4){// HAVE_ENOUGH_DATA
				if(debug_func_lifecycle) console.log("ready");

				this.queue.dequeue();
				HTML5Audio.onended = onended;
				this.isPlaying = true;
				HTML5Audio.play();
			}else{
				if(debug_func_lifecycle) console.log("not ready");

				setTimeout(function(){_this.loopStart.call(_this);},500);
			}
		}
		function onended(){
			if(debug_func_lifecycle)console.log("ended");

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
