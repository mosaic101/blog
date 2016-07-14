/**
 * Created by mosai on 2016/7/14.
 */
var UserModel = require('../schema/adminUserSchema');

var User = function(opt) {
    this.opt = opt;
}

User.prototype.save = function(callback) {
    var action = new UserModel(this.opt);

    action.save(callback);
};

/**
 * 通过用户名获取用户信息
 */
User.findUser = function(email, callback) {
    UserModel.findOne({
        email : email
    }).exec(function(err, doc) {
        callback(err, doc);
    });
};

/**
 * 通过用户id获取单个用户
 */
User.findUserById = function(id, callback) {
    UserModel.findOne({
        _id: id
    })
        .exec(function(err, doc) {
            callback(err, doc);
        });
};

/**
 * 根据编号获取单个用户
 * 只取部分数据
 * 返回单个文档
 * 直接回调方式
 */
User.getInfoById = function (id, callback) {

    UserModel.findOne({
        _id : id
    }, {
        _id: 1,
        nickname: 1
    }, function(err, doc) {
        callback(err, doc);
    });
};

/**
 * 获取用户列表
 */
User.getUsersList = function(page, callback) {
    UserModel.count(function(err1, count) {
        if(err1) {
            callback(err1);
        } else {
            page.totalRows = count;
            page.pageCount = Math.floor((count+page.pageSize)/page.pageSize);

            UserModel.find({},{
                password: 0
            })
            //.sort({createAt : -1})
                .skip((page.curPage-1)*page.pageSize)
                .limit(page.pageSize).exec(function(err2, docs) {
                if(err2) {
                    callback(err2);
                } else {
                    result = {
                        docs: docs,
                        page: page
                    };
                    callback(null, result);
                }
            });
        }
    });
};

/**
 * 通过用户id获取单个用户
 */
User.getSingleUser = function(id, callback) {
    UserModel.findOne({
        _id: id
    }, {
        password: 0
    })
        .exec(function(err, doc) {
            callback(err, doc);
        });
};

// 获取当前用户权限
User.getUserById = function(id, callback) {
    UserModel.find({_id: id})
        .populate({
            path: "role",
            select: "name permissions"
        })
        .exec(function(err, doc) {
            // console.log(doc);
            callback(err, doc);
        })
}

/**
 * 更新用户头像
 */
User.uploadPortrait = function(userId, remotePath, callback) {
    UserModel.update(
        {
            _id: userId
        }, {
            portrait: remotePath,
            thumbnail: remotePath
        }, {
            multi: false
        },
        function(err, numberAffected, raw) {
            callback(err, numberAffected);
        }
    );
};

/**
 * [修改个人资料]
 * @param  {String}   userId     [description]
 * @param  {Object}   updateFields [description]
 * @param  {Function} callback   [description]
 */
User.modifyProfile = function(userId, updateFields, callback) {
    UserModel.update({_id: userId}, updateFields, {multi: false}, function(err, numberAffected, raw) {
        if(err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, numberAffected);
        }
    });
};

/**
 * [modifyPwd]
 * @param  {String}   userId   [description]
 * @param  {String}   newPwd   [description]
 * @param  {Function} callback [description]
 */
User.modifyPwd = function(userId, newPwd, callback) {
    UserModel.update({
        _id: userId
    },{
        password: newPwd
    },{
        multi: false
    }, function(err, numberAffected, raw) {
        if(err) {
            callback(err);
        } else {
            callback(null, numberAffected);
        }
    });
};

// 权限
User.saveUser = function(criteria, content, callback) {
    UserModel.update(criteria, content, function(err) {
        callback(err);
    })
}

User.searchUser = function(email, callback) {
    // console.log(email);
    UserModel.find({
        email: new RegExp(email)
    }).exec(function(err, docs) {
        callback(err, docs);
    })
}

//User.getOperator = function(nickname, callback) {
//    UserModel.findOne({nickname:nickname}).exec(function(err, doc) {
//        callback(err, doc);
//    })
//}

User.getOperator = function(cribody, callback) {
    UserModel.findOne(cribody).exec(function(err, doc) {
        callback(err, doc);
    })
}

/*通过呢称查id*/
User.findByNickName = function(nickname,callback){
    UserModel.find({nickname:new RegExp(nickname)}).exec(function(err,doc){

        callback(err,doc);
    });

}

module.exports = exports = User;