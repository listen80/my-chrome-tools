chrome.contextMenus.create({
	"title": "View Cookie",
	"contexts": ["all"],
	"documentUrlPatterns": ["http://*/*", "https://*/*"],
	"onclick": function(info, tab) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.cookies.getAll({url: tab.url}, function(cookie){
				chrome.tabs.sendRequest(tab.id, {
					act: "showCookie",
					cookie: cookie
				}, function(response) {
					console.log("showCookie");
				});
			});
		});
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.act === "getConfig") {
		var config = {};
		try {
			config = JSON.parse(localStorage.getItem("config"));
		} catch (e) {}
		sendResponse(config || {});
	}
});

