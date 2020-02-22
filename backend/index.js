const express = require('express');

const app = express();

const cors = require('cors');

const mysqlDatabase = require('./mysqlDatabase');
const news = require('./app/news');
const comments = require('./app/comments');
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/news', news);
app.use('comments', comments);
const run = async () => {
    await mysqlDatabase.connect();
    app.listen(port, () => {
        console.log('Server running on', port);
    });
    process.on('exit', () => {
        mysqlDatabase.disconnect();
    })
};
run().catch(e => console.error(e));
