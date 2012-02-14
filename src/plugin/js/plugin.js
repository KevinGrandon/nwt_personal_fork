// Map of all registered plugsin to definitions
var pluginMap = {};

/**
 * Plugin wrapper class
 * @returns {NWTPlugin}
 */
function NWTPlugin() {

}


/**
 * Registers a plugin
 * @param object Definition of the plugin
 */
nwt.register = function(definition) {
	pluginMap[definition.name] = definition;
};

/**
 * Instantiates a plugin
 */
nwt.plugin = function(plugin) {
	var params = Array.prototype.slice.call(arguments),

		i,

		name = params.shift(),

		def = pluginMap[plugin];

	var tempHolder = function(){},
		myPluginClass;

	wrapPluginCall = function (method) {

		var _super;
		if (def.extends) {
			_super = function() {
				pluginMap[def.extends].methods[method].apply(this, arguments);
			};
		}

		return function() {
			this._super = _super;
			return def.methods[method].apply(this, arguments);
		}
	};

	// Wrap each method call so we can expose the super variable to it
	if (def.methods) {
		for (i in def.methods) {
			tempHolder.prototype[i] = wrapPluginCall(i);
		}
	}

	myPluginClass = new tempHolder();
	return myPluginClass.init.apply(myPluginClass, params);
};