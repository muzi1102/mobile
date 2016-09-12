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
    $('#J-from-textare').on('keyup', function() {
            var val = $(this).val();
            if (getStrlen(val)) {
                $('.ui-submitbtn').addClass('ui-submitbtn-success')
            } else {
                $('.ui-submitbtn').removeClass('ui-submitbtn-success')
            }
        })
        // 我要提问的文本框输入显示剩余多少文字
    $('#J-remaintxt').on('input', function() {
            var val = $(this).val(),
                count = getStrlen(val);
            $('#J-counter').text(count);
        })
        // 判断字数的函数
    function getStrlen(str) {
        var myLen = 0,
            i = 0;
        for (;
            (i < str.length); i++) {
            if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
                myLen++;
            else
                myLen += 2;
        }
        myLen = Math.ceil(myLen / 2);
        return myLen;
    }
    // 首页搜索点击快点，点我搜素
    $('.ui-searchbar-text').on('click', function() {
        $(this).prev().hide();
        $(this).hide().next().show().next().show();
        $('.ui-searchbar-input input').focus();
        $('.icon-close').on('click', function() {
            $('.ui-searchbar-input input').val('')
        })
    });
    // 搜索猜你喜欢问题展开；
    (function() {
        $('.ui-proitem').each(function() {
            var proH = $(this).height();
            var flag=true;
            if (proH > 120) {
                $(this).css({
                    height: '1.2rem',
                    overflow: 'hidden'
                })
                $(this).prev().find('.ui-push-more').css({
                    display: 'block'
                })
                $(this).prev().find('.ui-push-more').on('click', function(e) {
                    e.preventDefault();
                    $(this).toggleClass('morepro');
                    if ($(this).hasClass('morepro')) {
                         $(this).parents('.ui-proname').next().stop().animate({
                            height: proH
                        }, 'normal', 'linear');
                    }else{
                        $(this).parents('.ui-proname').next().stop().animate({
                            height: 1.2+'rem'
                        }, 'normal', 'linear')
                    }
                })
            }
        })
    })()
    // 清空历史记录
    $('.ui-empty').on('click',function(){
        $(this).parents('.ui-related-list').remove();
    })
})
