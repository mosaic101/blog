/**
 * ctx增加返回值中间件
 * Created by mosaic101 on 2016/11/28.
 */

module.exports = async function (ctx, next) {
    // 默认失败状态
    const DEFAULT_ERROR_STATUS = -99;
    // 默认成功状态
    const DEFAULT_SUCCESS_STAUS = 1;
    /**
     * 增加error方法，返回统一的error方法
     * @param message
     * @param status
     */
    ctx.error = function (message, status) {
        if (status === undefined) {
            status = DEFAULT_ERROR_STATUS;
        }
        return ctx.body = {
            tag: 'error',
            status: status,
            message: message || '操作失败!'
        };
    };
    /**
     * 增加success方法，直接返回统一的success结果
     * @param data
     * @param status
     * @returns {*}
     */
    ctx.success = function (data, status) {
        if (status === undefined) {
            status = DEFAULT_SUCCESS_STAUS;
        }
        return ctx.body = {
            tag: 'success',
            status: status,
            data: data
        };
    };

    await next();
};