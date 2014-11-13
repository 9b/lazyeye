function saveOptions() {
	var select = document.getElementById("endpoint");
	var url = select.value;
	localStorage["endpoint"] = url;
	
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}

function loadOptions() {
	var storage = localStorage["endpoint"];
	var select = document.getElementById("endpoint");
	select.value = storage;
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector('#save').addEventListener('click', saveOptions);