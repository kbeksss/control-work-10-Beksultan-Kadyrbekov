const express = require('express');
const path = require('path');
const multer = require('multer');
const nanoid = require('nanoid');

const mysqlDatabase = require('../mysqlDatabase');
const config = require('../config');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    const news = await mysqlDatabase.getConnection().query('SELECT * FROM `news_posts`');
    res.send(news);
});
router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.body);
    const news_obj = req.body;

    if(req.file){
        news_obj.image = req.file.filename;
    }

    if(!news_obj.title || !news_obj.text){
        return res.send("Missing required keys of title or text")
    } else {
        await mysqlDatabase.getConnection().query(
            'INSERT INTO `news_posts` (`title`, `text`, `image`) VALUES ' +
            '(?, ?, ?)',
            [news_obj.title, news_obj.text, news_obj.image]
        );
        res.send(news_obj);
    }
});

module.exports = router;
