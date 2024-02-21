window.onload= function() {
	var request = new XMLHttpRequest();

	request.open("GET", "/data/data.json", true);

	request.onload = function() {
		var jsonData = JSON.parse(request.responseText);
		document.title = jsonData.title;
		document.getElementById("title").innerHTML = jsonData.title;
	}

	request.send();
}
