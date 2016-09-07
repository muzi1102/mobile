$(function() {
    // 我的请求导航条切换
    $('.req-item a').on('click', function() {
            var $index = $(this).parent().index();
            $(this).addClass('active').parent().siblings().find('a').removeClass('active');
            $('.timeline').eq($index).addClass('active').siblings().removeClass('active');
        })
        // 选择问题的切换
    $('.ui-qstab-item').on('click', function() {
            var $index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.ui-qscontent').eq($index).addClass('active').siblings().removeClass('active');
        })
        // 点赞后的状态
    $('#j-zan').on('click', function() {
            $(this).html('谢谢你的赞').addClass('ui-zaned').children().remove();
        })
    // 提交反馈文本框输入问题，按钮样式改变
   	$('#J-from-textare').on('keyup',function(){
   		var val=$(this).val();
   			if (getStrlen(val)) {
   				$('.ui-submitbtn').addClass('ui-submitbtn-success')
   			}else{
   				$('.ui-submitbtn').removeClass('ui-submitbtn-success')
   			}
   	})
   	// 我要提问的文本框输入显示剩余多少文字
   	$('#J-remaintxt').on('input',function(){
   		var val=$(this).val(),
   			count=getStrlen(val);
   		$('#J-counter').text(count);
   	})
   	// 判断字数的函数
    function getStrlen(str) {
        var myLen = 0,
            i = 0;
        for (;(i < str.length); i++) {
            if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
                myLen++;
            else
                myLen += 2;
        }
        myLen=Math.ceil(myLen / 2);
        return myLen;
    }
})
