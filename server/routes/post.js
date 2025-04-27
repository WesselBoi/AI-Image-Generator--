const express = require('express');
const dotenv = require('dotenv');
const {v2: cloudinary} = require('cloudinary');

const Post = require('../models/post.js');

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.get('/', async(req,res) => {
    try {
        const posts = await Post.find({})

        return res.status(200).json({success: true, data: posts})
    } catch (err) {
        return res.status(500).json({success: false, msg: err})
    }
    })


router.post('/', async(req,res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo)
    
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })
    
        res.status(201).json({ success: true, data: newPost })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})



module.exports = router;