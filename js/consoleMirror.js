
//var $ = require("jquery");

module.exports = function() {
	(function(s){
		s.src='http://jsconsole.com/inject.js';
		document.body.appendChild(s);
	})(document.createElement('script'));

};