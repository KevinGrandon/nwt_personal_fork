/**
 * Provides ajax communication methods
 * The folllowing methods are chainable
 * success - success handler
 * failure - failure handler
 * serialize - serialize a form, selector, array, or object to send
 * @constructor
 */
function NWTIO(args) {
	this.req = null;
	this.config = {};
	this.url = args[0];

	var chainableSetters = ['success', 'failure', 'serialize'],
		i,
		setter,
		mythis = this,

		// Returns the setter function
		getSetter = function (setter) {
			return function (value) {
				mythis.config[setter] = value;
				return this;
			}
		};

	for (i = 0, setter; setter = chainableSetters[i]; i++) {
		this[setter] = getSetter(setter);
	}
}

/**
 * Runs the IO call
 * @param string Type of call
 */
NWTIO.prototype._run = function(method) {
	var mythis = this;
	this.req = new XMLHttpRequest();
	this.req.open(method, this.url);
	this.req.onreadystatechange = function() {		
		var callback;

		if (mythis.req.readyState == 4 && mythis.req.status == 200) {
			callback = 'success';
		} else if (mythis.req.readyState == 4) {
			callback = 'failure';
		}

		if (callback && mythis.config[callback]) {
			mythis.config[callback](mythis.req);
		}
	};
	this.req.send();
	return this;
};


/**
 * Runs IO POST
 */
NWTIO.prototype.post = function() {
	return this._run('POST');
};


/**
 * Runs IO GET
 */
NWTIO.prototype.get = function() {
	return this._run('GET');
};


/**
 * Runs IO PUT
 */
NWTIO.prototype.put = function() {
	return this._run('PUT');
};


/**
 * Runs IO DELETE
 */
NWTIO.prototype.delete = function() {
	
};

nwt.io = function() {
	return new NWTIO(arguments);
};