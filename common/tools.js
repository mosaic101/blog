/**
 * Created by mosaic101 on 2016/11/21.
 */
var moment = require('moment');

// 格式化时间
exports.formatDate = function (data,flag) {
    if (!flag) {
        moment(data).fromNow();
    }else {
        return moment(data).format('YYYY-MM-DD HH:mm');
    }
};