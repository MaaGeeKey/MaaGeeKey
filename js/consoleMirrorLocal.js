//var $ = require("jquery");

module.exports = function() {
	return (function consoleMirror(win, debug_div_name) {
		var d = document.createElement("div");
		document.body.appendChild(d);
		d.id = debug_div_name;
		d.style.backgroundColor = "rgba(100,100,100,0.2)";
		d.style.width = "200px";
		d.style.height = "200px";
		former = console.log;

		console.log = function(msg) {

			former.apply(window.console, arguments);
			var m = document.createElement("div");
			m.innerHTML = msg;
			d.appendChild(m);
		};

		win.onerror = function(message, url, linenumber) {
			console.log("JavaScript error: " + message + " on line " + linenumber + " for " + url);
		};
		return d;
	})(window, "d_console");
};