chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.msg == "matches") {
			chrome.browserAction.setBadgeText({"text": String(request.count) });
		}
	}
);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage")
		sendResponse({
			data: localStorage[request.key]
		});
	else if (request.method == "grabEndpoint") {
		sendResponse({
			endpoint: localStorage['endpoint'],
		});
	} else {
		sendResponse({}); // snub them.
	}
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, {file: "independent.js"});
});
