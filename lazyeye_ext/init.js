$(document).ready(function(){
	chrome.extension.sendRequest({method: "grabEndpoint"}, function(response) {
		if (response.hasOwnProperty('endpoint')) {
            // We have a valid endpoint. Go ahead with data extraction
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
            // Update icon count based on number of matches
            chrome.runtime.sendMessage({msg: "matches", count: postData['collectionCount'] });
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
            // There is no valid endpoint. Do nothing.
		}
	});
});
