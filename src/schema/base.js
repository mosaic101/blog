/**
 * Created by mosaic101 on 2016/11/21.
 */
const tools = require('../common/tools');

module.exports = function (schema) {
    schema.methods.create_at = function () {
        return tools.formatDate(this.createdAt, true);
    };

    schema.methods.update_at = function () {
        return tools.formatDate(this.updatedAt, true);
    };
};

