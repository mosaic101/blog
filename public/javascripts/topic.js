/**
 * Created by mosaic101 on 2016/11/20.
 */

/**
 * get请求
 * @param options
 * @param callback
 */
var $getReq = function (options,callback) {
    $.ajax({
        url: options.url,
        method: 'get',
        dataType: 'json',
        timeout: 5000,
        success: function (json) {
            if (json.tag == 'success') {
                return callback(null,json.data);
            }
            return callback(json.message || '请求失败！');
        },
        error: function (xmlHttpRequest) {
            callback('连接服务器失败！');
        }
    })
};

/**
 * post请求
 * @param options
 * @param callback
 */
var $postReq = function (options,callback) {
    $.ajax({
        url: options.url,
        data: options.data,
        method: 'post',
        dataType: 'json',
        timeout: 5000,
        success: function (json) {
            if (json.tag == 'success') {
                return callback(null,json.data);
            }
            return callback(json.message || '请求失败！');
        },
        error: function (xmlHttpRequest) {
            callback('连接服务器失败！');
        }
    })
};

/**
 * post请求
 * @param options
 * @param callback
 */
var $postReq = function (options,callback) {
    $.ajax({
        url: options.url,
        data: options.data,
        method: 'post',
        dataType: 'json',
        timeout: 5000,
        success: function (json) {
            if (json.tag == 'success') {
                return callback(null,json.data);
            }
            return callback(json.message || '请求失败！');
        },
        error: function (xmlHttpRequest) {
            callback('连接服务器失败！');
        }
    })
};

//todo alert组件
