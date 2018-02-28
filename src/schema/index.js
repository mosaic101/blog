/**
 * Created by mosaic101 on 2016/11/16.
 */
const mongoose = require('mongoose');
const config = require('getconfig');

let DATABASE_URL = 'mongodb://' + config.host + '/blog';
//use native promises Instead of mpromise //mongoose return mpromise
mongoose.Promise = global.Promise;

//connect mongodb's database
mongoose.connect(DATABASE_URL, {server: {poolSize: 20}}, (err) => {
    if (err) {
        //fixme 添加logger日志
        // logger.error('connect to %s error: ', DATABASE_URL, err.message);
        process.exit(1);
    }
});


exports.Topic =  require('./topic');
exports.User = require('./user');