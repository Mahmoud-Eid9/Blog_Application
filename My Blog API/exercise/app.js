const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
});

const getExt = (mimetype) => {
    switch(mimetype){
        case "image/png":
            return '.png';
        case "image/jpeg":
            return '.jpg';
    }
}
const upload = multer({storage : storage});
const app = express();
const Post = require("./api/models/posts");
const postsData = new Post();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})
app.use('/uploads', express.static('uploads'))

app.get("/api/posts", (req, res) => {


    res.status(200).send(postsData.get())

});

app.get("/api/posts/:post_id", (req, res) => {
    const postID = req.params.post_id;
    const foundPost = postsData.getIndividualPost(postID);
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.status(404).send("NOT FOUND")
    }
})


app.post("/api/posts",upload.single("post_image"), (req, res) => {
console.log(req.body);
console.log(req.file);
  const newPost = {
        "id":`${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": `${req.file.destination}${req.file.filename}`,
        "added_date": `${Date.now()}`
    } 
    postsData.add(newPost); 
    res.status(201).send("ok");
})


app.listen(3000, () => console.log("Listening on http://localhost:3000"))