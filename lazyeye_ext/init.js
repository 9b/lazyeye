$(document).ready(function(){
	var entirePage = window.document.documentElement.innerHTML;
	var postData = {
		'urlContext': location.href,
		'collectionTime': new Date(),
		'userBrowser': navigator.userAgent,
		'collectionData': {
			'hashes': [],
			'domains': [],
			'ip_addresses': [],
			'email_addresses': []
		},
		'collectionCount': 0
	}
	
	postData['collectionData']['hashes'] = striker('hashes', entirePage).filter(onlyUnique);
	postData['collectionData']['email_addresses'] = striker('email', entirePage).filter(onlyUnique);
	postData['collectionData']['ip_addresses'] = striker('ip', entirePage).filter(onlyUnique);
	postData['collectionData']['domains'] = striker('domain', entirePage).filter(onlyUnique);
	
	for (var key in postData['collectionData']) {
		postData['collectionCount'] += postData['collectionData'][key].length;
	}

	chrome.runtime.sendMessage({msg: "matches", count: postData['collectionCount'] });
	chrome.extension.sendRequest({method: "grabEndpoint"}, function(response) {
		if (response.hasOwnProperty('endpoint')) {
			$.ajax({
				url: response.endpoint,
				type: 'post',
				contentType:'application/json',
				data: JSON.stringify(postData),
				dataType: 'json',
				success: function(response) {
					chrome.runtime.sendMessage({msg: "matches", count: 0});
				}
			});
		} else {
			console.log("FUCK YOU! FUCK YOU! IM FUCKIN' DYING HERE!"); // you get the gist
		}
	});
});