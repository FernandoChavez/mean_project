const express = require('express');
const multer = requiere("multer");
const Post = require('../models/post');
const router= express.Router();

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split('').join('-');
    const ext = MIME_TYPE_MAP [file.mimetype];
    cb(null, name + '_' + Date.now()+ '.'+ ext);
  }
});

//router.post('/api/posts', (req, res, next) =>{
  router.post('', multer(storage).single('image'), (req, res, next) =>{
  //vconst post = req.body;
  //vCreating a POST instance in models
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  //console.log(post);
  //Mongoose autamatically create the right query for our database to insert a new entry with data and taht generate autamatically ID into a database
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });

});

// router.put("/api/posts/:id", (req, res, next) =>{
router.put("/:id", (req, res, next) =>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content:req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({message: 'Update successfull'});
  });
});


// router.use('/api/posts', (req, res, next) =>{

//router.get('/api/posts', (req, res, next) =>{
router.get('', (req, res, next) =>{
  /*

  const posts = [
    {
      id: 'fadf12421l',
      title:'First server-side post',
      content: 'This is coming from the server'
    },
    {
      id: 'ksajflaj132',
      title:'Second server-side post',
      content: 'This is coming from the server'
    }
  ];

  */

  //find return all entries
  Post.find().then(documents => {
    //console.log(documents);
    // documents are javascripts objects
    res.status(200).json({
      message: 'Posts fetched  successfully!',
      posts: documents
    });
  });
});

//router.get("/api.posts/:id", (req, res, next) => {
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post =>{
    if (post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  })
})

//router.delete('/api/posts/:id', (req, res, next) => {
router.delete('/:id', (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result =>{
    console.log(result);
    res.status(200).json({message: 'Post deleted!!'});
  });
});

module.exports = router;
