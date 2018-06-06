chrome.contextMenus.create({
  "title": "View Cookie",
  "contexts": ["all"],
  "documentUrlPatterns": ["http://*/*", "https://*/*"],
  "onclick": function(info, tab) {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.cookies.getAll({ url: tab.url }, function(cookie) {
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
// chrome.webRequest.onCompleted.addListener(function (argument) {
// 	console.log(argument)
// }, { urls: ["http://*/*"] })

// chrome.webRequest.onBeforeRequest.addListener(function(details) {
//   console.log(details);
//   // var url = details.url;
//   // // url = url.replace("http", "https");
//   // details.url = 'http://localhost/';
//   details.url = 'http://www.xunlei.com'
//   console.log("修改后的请求地址" + details.url);
//   // return 'http://www.xunlei.com';
//   return {redirectUrl: 'http://www.xunlei.com'}
//   return {cancel: true || details.url.indexOf("localhost") != -1};
// }, { urls: ["http://*/*"] }, ["blocking"])