

const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();

}

const getPosts = () => {

    fetch(API_URL).then(res => {
        return res.json()
    }).then(data => {
        buildPosts(data)})
}

const buildPosts = (blogPosts) => {
    let blogPostsContent = ""
    for(blogPost of blogPosts){
        const postdate = new Date(parseInt(blogPost.added_date)).toDateString();
        const postimage = `${API_BASE_URL}${blogPost.post_image}`;
        const postLink = `post.html?id=${blogPost.id}` 
        blogPostsContent +=   
    `
    <a class = "post-link" href = "${postLink}">             
        <div class = "post">
            <dive class = "post-image" style= "background-image : url(${postimage})"></dive>
            <div class = "post-content">
                <div class = "post-date">${postdate}</div>
                <div class = "post-title"><h4>${blogPost.title}</h4></div>
                <div class = "post-text">${blogPost.content}</div>
    
            </div>

        </div>
    </a>
    `
    document.querySelector(".blog-posts").innerHTML = blogPostsContent;
    
    }
}