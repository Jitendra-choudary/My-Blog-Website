const blogSection = document.querySelector(".blogs-section");

// Make an AJAX request to fetch blogs from your PHP file
fetchBlogsFromDatabase()
	.then((blogs) => {
		blogs.forEach((blog) => {
			createBlog(blog);
		});
	})
	.catch((error) => {
		console.error("Error fetching blogs:", error);
	});
const createBlog = (blog) => {
	const blogCard = document.createElement("div");
	blogCard.classList.add("blog-card");

	const blogImage = document.createElement("img");
	blogImage.src = blog.main_image_id;
	blogImage.classList.add("blog-image");
	blogImage.alt = "";

	const blogTitle = document.createElement("h1");
	blogTitle.classList.add("blog-title");
	blogTitle.textContent = blog.title.substring(0, 100) + "...";

	const blogOverview = document.createElement("p");
	blogOverview.classList.add("blog-overview");
	blogOverview.textContent = blog.content.substring(0, 200) + "...";

	const blogLink = document.createElement("a");
	blogLink.href = `blog.html?id=${blog.id}`; // Pass the blog ID as a query parameter
	blogLink.classList.add("btn", "dark");
	blogLink.textContent = "read";

	blogLink.addEventListener("click", (event) => {
		event.preventDefault();
		window.location.href = blogLink.href;
	});

	blogCard.appendChild(blogImage);
	blogCard.appendChild(blogTitle);
	blogCard.appendChild(blogOverview);
	blogCard.appendChild(blogLink);

	blogSection.appendChild(blogCard);
};


// Function to fetch blogs from your PHP file
function fetchBlogsFromDatabase() {
	return new Promise((resolve, reject) => {
		// Make an AJAX request to your PHP file
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "fetch_blogs.php");
		xhr.onload = function () {
			if (xhr.status === 200) {
				const response = JSON.parse(xhr.responseText);
				resolve(response);
			} else {
				reject("Error fetching blogs");
			}
		};
		xhr.onerror = function () {
			reject("Error fetching blogs");
		};
		xhr.send();
	});
}

// Get the "About" link element
const aboutLink = document.querySelector('.link-item a[href="#about"]');

// Add an event listener to the link
aboutLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior

    // Get the target element to scroll to (the "About" section)
    const aboutSection = document.getElementById('about');

    // Scroll to the target element
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

