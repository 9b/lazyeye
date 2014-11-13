function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function striker(seek_type, entirePage) {
	matches = new Array();
	if (matchbook.hasOwnProperty(seek_type)) {
		for (var pattern in matchbook[seek_type]['patterns']) {
			var rx = new RegExp(matchbook[seek_type]['patterns'][pattern]); 
			while((match = rx.exec(entirePage)) !== null) { 
				matches.push(match[matchbook[seek_type]['offset']]); 
			}
		}
	}
	return matches
}

var matchbook = {
	'hashes': {
		'patterns': [ 
			/[^a-f0-9]([a-f0-9]{32})(?![a-f0-9])/gi, 
			/[^a-f0-9]([a-f0-9]{40})(?![a-f0-9])/gi, 
			/[^a-f0-9]([a-f0-9]{64})(?![a-f0-9])/gi 
		],
		'offset': 1
	},
	'email': { 
		'patterns': [
			/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi 
		],
		'offset': 1
	},
	'ip': {
		'patterns': [
			/(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/gi
		],
		'offset': 0
	},
	'domain': {
		'patterns': [
			/(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{3,6}?/gi
		],
		'offset': 0
	}
}