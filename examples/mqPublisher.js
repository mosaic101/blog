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
/*
 *  0: 减少 qoa
 *  1: 增加 qoa
 * */
var codeSet = {
    "1":{
        remark:"非同步商品增加销售数量",
        type:"async_sale",
        system:"purchase",
        operate:0
    },
    "2":{
        remark:"非同步商品减少销售数量",
        type:"async_sale",
        system:"purchase",
        operate:1
    },
    "3":{
        remark:"售卖",
        type:"on_sale",
        system:"purchase",
        operate:0
    },
    "4":{
        remark:"下架",
        type:"soldOut",
        system:"purchase",
        operate:1
    },
    "5":{
        remark:"用户下单",
        type:"order",
        system:"api_server",
        operate:0
    },
    "6":{
        remark:"取消订单",
        type:"cancel",
        system:"api_server",
        operate:1
    },
    "7":{
        remark:"取消订单",
        type:"cancel",
        system:"service",
        operate:1
    },
    "8":{
        remark:"确认拣货数量变动",
        type:"pick_confirm",
        system:"inventory",
        operate:1
    },
    "9":{
        remark:"盘盈",
        type:"stockAdd",
        system:"inventory",
        operate:1
    },
    "10":{
        remark:"盘亏",
        type:"stockCut",
        system:"inventory",
        operate:0
    },
    "11":{
        remark:"普通移库(目标为存储位拣货位)",
        type:"stockMove",
        system:"inventory",
        operate:1
    },
    "12":{
        remark:"普通移库(源为存储位拣货位)",
        type:"stockMove",
        system:"inventory",
        operate:0
    },
    "13":{
        remark:"上架",
        type:"rack",
        system:"inventory",
        operate:1
    },
    "14":{
        remark:"调拨",
        type:"transfer",
        system:"inventory",
        operate:0
    }
};

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