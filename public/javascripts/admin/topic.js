/**
 * Created by wujj on 2016/11/29.
 */
$(function () {
    //提交按鈕
    $('#publishTopic').on('click',function () {
        var $title = $('#title').val().trim();
        if (!title) {
            return alert('缺失标题');
        }
        var markdown = simplemde.value();
        if (!markdown) {
            return alert('请填写内容');
        }
        var html = simplemde.options.previewRender(markdown);
        $postReq({
            url: '/admin/topic',
            data: {
                title: $title,
                markdown: markdown,
                html: html
            }
        },function (err,data) {
            if (err) {
                return alert(err);
            }
            console.log(data);
            alert('发表成功');
        })
    })
});