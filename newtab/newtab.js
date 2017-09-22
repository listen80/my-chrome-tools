
document.addEventListener("DOMContentLoaded" , function(){
	var now = 0;
	var inputs = [];
	function bind(id, engine){
		var el = document.getElementById(id);
		var input = find(el, "input");
		inputs.push(input);
		var click = find(el, "click");
		input.addEventListener("keydown", function(event){
			if(event.keyCode === 13) {
				open(engine, this.value);
			}
		});
		click.addEventListener("click", function(event){
			open(engine, input.value);
		});
	}

	function open(engine, value) {
		window.open(engine + value)
	}

	function find(el, role) {
		var inputs = el.getElementsByTagName("input");
		for(var x = 0, len = inputs.length; x < len; x++) {
			if(inputs[x].getAttribute("role") == role){
				return inputs[x];
			}
		}
		return null;
	}

	bind("baidu", "https://www.baidu.com/s?wd=");

	bind("google", "https://www.google.com.hk/#q=");

});
