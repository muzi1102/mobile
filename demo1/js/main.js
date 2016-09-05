$(function(){
	// 我的请求导航条切换
	$('.req-item a').on('click',function(){
		var $index=$(this).parent().index();
		$(this).addClass('active').parent().siblings().find('a').removeClass('active');
		$('.timeline').eq($index).addClass('active').siblings().removeClass('active');
	})
	// 选择问题的切换
	$('.ui-qstab-item').on('click',function(){
		var $index=$(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('.ui-qscontent').eq($index).addClass('active').siblings().removeClass('active');
	})
})
