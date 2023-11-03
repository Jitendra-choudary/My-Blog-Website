document
	.getElementById("banner-upload")
	.addEventListener("change", function (event) {
		var file = event.target.files[0];
		var reader = new FileReader();

		reader.onload = function (e) {
			var bannerDiv = document.getElementById("banner");
			bannerDiv.style.backgroundImage = "url(" + e.target.result + ")";
		};

		reader.readAsDataURL(file);
		
	});