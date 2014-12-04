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
            console.log('No endpoint specified. Appending data to page');
            collectionData = postData['collectionData'];
            
            var container = document.createElement("div");
            container.id = "lazyeye_container";
            $(document.body).prepend(container);
            $('#lazyeye_container')
            .css('background-color', '#eee').css('position', 'fixed').css('top', '0px')
            .css('left', '0px').css('right', '0px').css('height', '40px').css('z-index', '100000')
            .css('padding', '5px').css('border-bottom', '1px solid #333').css('font-size', '15px')
            .css('text-align', 'left').css('font-family', 'sans-serif');
            $('body').css('margin-top', '40px')
            
            var output = '';
            for (var key in collectionData) {
                if (collectionData[key].length == 0) continue;
                output += ' &nbsp;' + key + ' (' + collectionData[key].length + ') ';
                output += '<textarea id="' + key + '" class="lazyeye_ta" rows="1" cols="10" onclick="this.select()">';
                var collected = '';
	            for (i=0; i < collectionData[key].length; i++) {
	                value = collectionData[key][i];
	                collected += value + '\n';
                }
                output += collected + '</textarea> ';
			}
            $('#lazyeye_container').html('<b>LazyEye : </b>' + output);
            $('.lazyeye_ta').css('vertical-align', 'middle');
		}
	});
});
