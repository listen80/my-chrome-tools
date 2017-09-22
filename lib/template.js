~ function() {
	var template = function(id, data) {
		if(typeof id === 'string') {
			var compiler = cache[id] ? cache[id] : cache[id] = build(id);
			return arguments.length === 1 ? compiler : compiler(data);
		}
	};

	var cache = {};

	var build = function(id) {
		var tpl = '';
		if(id.indexOf('<') !== -1 && id.indexOf('>') !== -1) {
			tpl = id;
		} else {
			var el = document.getElementById(id);
			if(el) {
				tpl = el.innerHTML;
			}
		}
		return compiler(tpl)
	}

	var compiler = function(tpl) {
		var tpl = compile(tpl);
		return function(data) {
			return tpl.call(template, data).toString()
		}
	}

	var toString = function(value) {
		if (typeof value !== 'string') {
			if (value == null) {
				value = ''
			} else {
				value = value + '';
			}
		}
		return value;
	};

	var escapeMap = {
		"<": "&#60;",
		">": "&#62;",
		'"': "&#34;",
		"'": "&#39;",
		"&": "&#38;"
	};

	var escapeFn = function(s) {
		return escapeMap[s];
	};

	var escape = function(value) {
		return toString(value).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
	};

	var isArray = Array.isArray || function(obj) {
		return obj && typeof obj.length === 'number';
	};

	var forEach = function(data, callback) {
		var i, len, count = 0;
		if (isArray(data)) {
			for (i = 0, len = data.length; i < len; i++) {
				callback.call(data, data[i], i, i);
			}
		} else {
			for (i in data) {
				callback.call(data, data[i], i, count);
				count++;
			}
		}
	};

	template.$e = escape;
	template.$f = forEach;
	template.$s = toString;

	var stringify = function(code) {
		return "'" + code
			.replace(/('|\\)/g, '\\$1')
			.replace(/\r/g, '\\r')
			.replace(/\n/g, '\\n') + "'";
	}

	var compile = function(source) {
		var isNewEngine = ''.trim;
		var replaces = isNewEngine ? ["$o='';", "$o+=", ";", "$o"] : ["$o=[];", "$o.push(", ");", "$o.join('')"];
		var headerCode = "'use strict';var $t=this,$e=$t.$e,$f=$t.$f,$s=$t.$s,";
		var mainCode = replaces[0];
		var footerCode = "return new String(" + replaces[3] + ");"

		forEach(source.split("{{"), function(code, index) {
			code = code.split("}}");
			var $0 = code[0];
			var $1 = code[1];
			var len = code.length;
			if (code.length === 1) {
				mainCode += html($0);
			} else if (len === 2) {
				mainCode += logic($0);
				if ($1) {
					mainCode += html($1);
				}
			}
		});

		function html(code) {
			if (code) {
				code = replaces[1] + stringify(code) + replaces[2];
			}
			return code;
		}

		function logic(code) {
			split = code.replace(/^\s+|\s+$/, '').split(/\s+/);
			var key = split.shift();
			switch (key) {

				case 'if':
					code = 'if(' + split.join(' ') + '){';
					break;

				case 'else':
					code = '}else{';
					break;

				case 'elseif':
					code = '}else if(' + split.join(' ') + '){';
					break;

				case '/if':
					code = '};';
					break;

				case 'for':
					split[0] = split[0] || '$d';
					split[1] = split[1] || '$v';
					split[2] = split[2] || '$k';
					code = '$f(' + split.shift() + ',function(' + split.join() + '){';
					break;

				case '/for':
					code = '});';
					break;

				case '#':
					code = code + ';';
					break;

				case 'include':
					code = replaces[1] + "$t(" + split.join() + ")" + replaces[2];
					break;

				default:
					code = replaces[1] + "$s(" + code +  ")"+ replaces[2];
					break;
			}
			return code;
		}

		return new Function("$d", headerCode + mainCode + footerCode);;
	}

	if (typeof module === 'object') {
		module.exports = template;
	} else {
		this.template = template;
	}
}();