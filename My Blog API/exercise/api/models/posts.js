const PATH = "./data.json";
const fs = require('fs');

class Post{
    get(){
        //gets all posts
        return this.readData();
    }

    getIndividualPost(postID){
        //gets one blog post
        const posts = this.readData();
        const found = posts.find(post => postID == post.id);
        return found ;
    }
    add(newPost){
        //add a new post
        let currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }

    readData(){
        
        let rawdata = fs.readFileSync(PATH);
        let posts = JSON.parse(rawdata);
        return posts;
    }

    storeData(rawData){
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH, data);
    }
}
module.exports = Post ;
