const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public', 'uploads'),
    database: {
        host     : 'localhost',
        user     : 'beks',
        password : '123456',
        database : 'news_database'
    }
};
