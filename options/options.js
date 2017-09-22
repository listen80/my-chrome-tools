
var config = getConfig();

function getConfig() {
	var config = localStorage.getItem("config");
	config = JSON.parse(config);
	config = config || {};
	config.max = config.max || 20;
	config.show = config.show || 3;
	return config;
}

function setConfig() {
	localStorage.setItem("config", JSON.stringify(config));
}

document.addEventListener("DOMContentLoaded", function(){

	document.all.max.getElementsByTagName('option')[config.max / 10 - 1].selected = true;

	document.all.show.getElementsByTagName('option')[config.show - 1].selected = true;

	document.all.max.onchange = function() {
		config.max = Number(this.value);
		setConfig();
	}

	document.all.show.onchange = function() {
		config.show = Number(this.value);
		setConfig();
	}
})