/**
 * Created by Administrator on 2016/3/27.
 */
var amqp = require('amqplib/callback_api');
var path = require("path");
var config = require("getconfig");
var server_ip = config["mqServerIP"];
var account = config["mq_account"];
var password = config["mq_password"];
var connect = undefined;
var channel = undefined;

var init = function(callback){
    if(!channel){
        amqp.connect('amqp://'+account+":"+password+"@"+server_ip, function(err, conn) {
            if(conn){
                connect = conn;
                console.log("rabbitMQ-server has connected.");
                conn.createChannel(function(err, ch) {
                    console.log("rabbitMQ channel has been created.");
                    channel = ch;
                    if(callback){
                        callback(err,ch);
                    }
                });
            }else{
                if(callback){
                    callback(err,null);
                }
            }
        });
    }else{
        if(callback){
            callback(null,channel);
        }
    }
};

/**
 * 发送qoa日志消息
 * @param obj
 * {
 *     code:      // 代号
 *     goodName:  // 商品名称
 *     qoa:      // 操作前实时 qoa
 *     amount:   // 增量
 *     remark:   // 操作逻辑说明
 *     type:     // qoa操作类型
 *     system:   // 所属系统
 *     operate:  // 运算方式 0:减 1:加
 *     GoodId:   // 商品ID
 *     WarehouseId: // 仓库ID
 *     timeStamp:  // 时间戳 13位
 * }
 */
var sendMessage = function(obj){
    if(!obj.code || !obj.amount || !obj.GoodId || !obj.WarehouseId){
        console.log("消息不完整:",JSON.stringify(obj));
    }else{
        var q = 'qoa-log';
        obj.remark = codeSet[obj.code]["remark"];
        obj.type = codeSet[obj.code]["type"];
        obj.system = codeSet[obj.code]["system"];
        obj.operate = codeSet[obj.code]["operate"];
        obj.timeStamp = new Date().getTime();
        var msg = JSON.stringify(obj);
        console.log(msg);
        if(channel){
            channel.sendToQueue(q, new Buffer(msg));
        }else{
            init(function(err,ch){
                channel.sendToQueue(q, new Buffer(msg));
            });
        }
    }
};

module.exports = {
    init:init,
    sendMessage:sendMessage
};