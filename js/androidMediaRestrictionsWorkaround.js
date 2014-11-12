//var $ = require("jquery");

module.exports = function() {
	function setSource() {
		console.log("play d_audio");
		d_audio.play();
	}

	function mediaPlaybackRequiresUserGesture() {
		// test if play() is ignored when not called from an input event handler
		var video = document.createElement('video');
		video.play();
		return video.paused;
	}

	function removeBehaviorsRestrictions() {
		console.log("removing restrictions");

		window.removeEventListener('keydown', removeBehaviorsRestrictions);
		window.removeEventListener('mousedown', removeBehaviorsRestrictions);
		window.removeEventListener('touchstart', removeBehaviorsRestrictions);
		//log('wait 1 second');
		setTimeout(setSource, 3000);
	}

	if (mediaPlaybackRequiresUserGesture()) {
		console.log('wait for input event');
		window.addEventListener('keydown', removeBehaviorsRestrictions);
		window.addEventListener('mousedown', removeBehaviorsRestrictions);
		window.addEventListener('touchstart', removeBehaviorsRestrictions);
	} else {
		console.log('no user gesture required');
		setSource();
	}
};