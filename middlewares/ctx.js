/**
 * ctx增加返回值中间件
 * Created by mosaic101 on 2016/11/28.
 */

module.exports = async (ctx, next) => {
    // 默认失败状态
    const DEFAULT_ERROR_STATUS = -99;
    // 默认成功状态
    const DEFAULT_SUCCESS_STATUS = 1;
    const DEFAULT_VALIDATION_ERROR = -10;
    /**
     * 增加error方法，返回统一的error方法
     * @param error
     * @param status
     */
    ctx.error = (error, status) => {
        let message;
        if (error) {
            if (error instanceof Error) {
                message = error.message;
            }
            if (typeof error == 'string') {
                message = error;
            }
        }
        //fixme logger
        return ctx.body = {
            tag: 'error',
            status: status === undefined ? DEFAULT_ERROR_STATUS : status,
            message: message || '系统错误'
        };
    };
    /**
     * 增加success方法，直接返回统一的success结果
     * @param data
     * @param status
     * @returns {*}
     */
    ctx.success = (data, status) => {
        if (status === undefined) {
            status = DEFAULT_SUCCESS_STATUS;
        }
        return ctx.body = {
            tag: 'success',
            status: status === undefined ? DEFAULT_SUCCESS_STATUS : status,
            data: data
        };
    };
    /**
     * 增加validateFail方法，直接返回统一的校验失败结果
     * @param failures
     * @param status
     * @returns {*}
     */
    ctx.validationFailed = function (failures, status) {
        return ctx.body = {
            tag: 'error',
            status: status === undefined ? DEFAULT_VALIDATION_ERROR : status,
            message: '参数错误！',
            failures: failures
        };
    };
    await next();
};