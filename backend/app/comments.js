const express = require('express');
const mysqlDatabase = require('../mysqlDatabase');
const router = express.Router();

router.get('/', async (req, res) => {
    if(req.query.news_id){
        const news_comments = await mysqlDatabase.getConnection().query('SELECT * FROM `comments` WHERE `news_id` = ?', req.query.news_id );
        if(news_comments){
            res.send(news_comments);
        } else{
            res.send('NO such news anymore');
        }
    } else{
        const comments = await mysqlDatabase.getConnection().query('SELECT * FROM `comments`');
        res.send(comments);
    }
});

router.post('/', async (req, res) => {
    const comment = req.body;
    if(comment.news_id && comment.comment){
        if(!comment.author){
            comment.author = 'Anonymous'
        }
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
    } else{
        res.status(404).send('Empty comment or no such news');
    }
});

router.delete('/:id', async (req, res) => {
    const comment_single = await mysqlDatabase.getConnection().query('DELETE FROM `comments` WHERE `comment_id` = ?', req.params.id);
    if(comment_single.affectedRows){
        res.send('Comment was deleted successfully ');
    } else{
        res.send('No comment was found');
    }
});

module.exports = router;
