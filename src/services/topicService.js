/**
 * Created by mosaic101 on 2016/7/19.
 */
const _ = require('lodash');
const moment = require('moment');
const {markdown} = require('markdown');
const Topic = require('../models/topic');

/**
 * 【add】
 * @param topic {object}
 */
exports.add = (topic) => {
    return Topic.save(topic);
};

/**
 * 【commend】
 * @param where {object}
 * @param offset {number}
 * @param limit {number}
 */
exports.commend = (where, offset, limit) => {
    return Topic.findAll(where, offset, limit);
};

/**
 * 【list】
 * @param where {object}
 * @param offset {number}
 * @param limit {number}
 */
exports.list = async (where, offset, limit) => {
    let data =  await Topic.findAll(where, offset, limit);
    _.forEach(data,(value,key) => {
        value.html = value.html.split('\n')[0]; //截取第一部分
        value.createdAt = moment(value.createdAt).format('YYYY-MM-DD');
    });
    return data;
};

/**
 * 【one】
 * @param id {string}   
 */
exports.one = (id) => {
    return Topic.findById(id);
};