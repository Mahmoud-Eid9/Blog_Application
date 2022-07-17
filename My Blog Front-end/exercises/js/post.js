/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */

const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

getPostId = () => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    return urlParams.get("id");
    
}

const getPost = () => {
    // CODE GOES HERE
    postId = getPostId();
    fetch(`${API_URL}${postId}`).then(res => {
        return res.json()
    }).then(data =>{
        buildPost(data)
    })
    
}

const buildPost = (data) => {
    // HINT: Convert the date number to a Date string 
    const postdate = new Date(parseInt(data.added_date)).toDateString();
    document.querySelector(".background_image").style.backgroundImage = `url(${API_BASE_URL}${data.post_image})`
    document.getElementById("individual-post-title").innerText = data.title
    document.getElementById("individual-post-date").innerText = `Published in ${postdate}`
    document.getElementById("individual-post-text").innerText = data.content

}

