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
            // No endpoint was specified
            collectionData = postData['collectionData'];
            fieldset = document.createElement('fieldset');
            legend = document.createElement('legend');
            legend.innerHTML = '<h1>LazyEye</h1>';
            fieldset.appendChild(legend);
            for(var key in collectionData){
                if(collectionData[key].length == 0)
                    continue;
                pTag = document.createElement('p');
                label= document.createElement('label');
                label.innerHTML = '<b>'+key+'</b>';
                textarea = document.createElement('textarea');
                textarea.id = key;
                textarea.name = key;
                textarea.cols = 50;
                for(i=0;i<collectionData[key].length;i++){
                    value = collectionData[key][i];
                    textarea.innerHTML += value+'\n';
                }
                pTag.appendChild(label);
                pTag.appendChild(textarea);
                fieldset.appendChild(pTag);
            }
            body = document.getElementsByTagName('body')[0];
            body.appendChild(fieldset);
		}
	});
});
