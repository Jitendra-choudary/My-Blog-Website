// Get the blog ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

// Function to fetch the blog details from the database
const fetchBlogDetailsFromDatabase = async (blogId) => {
	try {
		const response = await fetch(`fetch_blog.php?id=${blogId}`);
		if (!response.ok) {
			throw new Error("Error fetching blog details");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

// Function to display the blog details on the page
const displayBlogDetails = (blog) => {
	const bannerElement = document.querySelector(".banner");
	const titleElement = document.querySelector(".title");
	const publishedElement = document.querySelector(".published");
	const articleElement = document.querySelector(".article");

	bannerElement.style.backgroundImage = `url(${blog.main_image_id})`;
	titleElement.textContent = blog.title;
	publishedElement.innerHTML = `<span>published at - ${blog.author}</span>`;
	articleElement.innerHTML = blog.content;
};

// Fetch the blog details and display them on the page
fetchBlogDetailsFromDatabase(blogId)
	.then((blog) => {
		displayBlogDetails(blog);
	})
	.catch((error) => {
		console.error(error);
	});
