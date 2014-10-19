//var $ = require("jquery");
//var config = require("../config");

module.exports = (function (){
	var Util = {};

	/**
	 * modifies targetObj to fill in missing default values
	 * useful for function options
	 * @param  {Value Object} targetObj  given options object
	 * @param  {Value Object} defaultObj object of expected values and their default values
	 */
	Util.mergeDefault = function mergeDefault(targetObj, defaultObj){
		for (var attrname in defaultObj) {
			if (!targetObj.hasOwnProperty(attrname)) {
				targetObj[attrname] = defaultObj[attrname];
			}
		}
	};

	Util.stringReplace = function stringReplace(){
		var args = arguments;
		return args[0].replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number+1] != 'undefined'
				? args[number+1]
				: match
			;
		});
	};

	return Util;
})();
