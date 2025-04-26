const express = require('express');
const dotenv = require('dotenv');
const {v2: cloudinary} = require('cloudinary');

const Post = require('../models/post.js');

dotenv.config();

const router = express.Router();

module.exports = router;