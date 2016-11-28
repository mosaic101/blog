/**
 * Created by mosaic101 on 2016/11/26.
 */
$(function () {
   $('#login').on('click',function () {
       var $userName = $('#userName').val().trim();
       var $pwd = $('#pwd').val().trim();
       if (!$userName || !$pwd) {
           return alert('缺少')
       }
       $postReq({
            url: '/admin/login',
            data: {
                userName: $userName,
                pwd: $pwd
            }
       },function (err,data) {
           if (err) {
               return alert(err);
           }
           console.log(data);
       })
   }) 
});