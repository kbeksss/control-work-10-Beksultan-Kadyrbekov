const express = require('express');
const mysqlDatabase = require('../mysqlDatabase');
const router = express.Router();

router.get('/', async (req, res) => {
    const comments = await mysqlDatabase.getConnection().query('SELECT * FROM `comments`');
    res.send(comments);
});

router.post('/', async (req, res) => {
    const comment = req.body;
    if(comment.news_id && comment.comment){
        try{
            await mysqlDatabase.getConnection().query(
                'INSERT INTO `comments` (`news_id`, `author`, `comment`) VALUES ' +
                '(?, ?, ?)',
                [comment.news_id, comment.author, comment.comment]
            );
            res.send('New comment was successfully added');
        } catch(e){
            res.status(404).send('Your comment was not added');
        }
        res.send('successfully added')
    } else{
        res.status(404).send('Empty comment or no such news');
    }
});


module.exports = router;
