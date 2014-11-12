//var $ = require("jquery");

module.exports = function() {
	function setSource() {
		console.log("release power!");
		var video = document.createElement('video');
		video.src = 'https://archive.org/download/anita-leker-med-kameran/anita-leker-med-kameran.' +
			(video.canPlayType('video/mp4') ? 'mp4' : 'ogv');
		setTimeout(function(){video.src="";}),5000);
	}

	function mediaPlaybackRequiresUserGesture() {
		// test if play() is ignored when not called from an input event handler
		var video = document.createElement('video');
		video.play();
		return video.paused;
	}

	function removeBehaviorsRestrictions() {
		console.log("remove restrictions");

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