$(function() {
    // 我的请求导航条切换
    $('.req-item a').on('click', function() {
            var $index = $(this).parent().index();
            $(this).addClass('active').parent().siblings().find('a').removeClass('active');
            $('.timeline').eq($index).addClass('active').siblings().removeClass('active');
        })
        // 选择问题的切换
    $('.ui-qstab-item').on('click', function() {
            var $index = $(this).index(),
                val;
            $(this).addClass('active').siblings().removeClass('active');
            val=$(this).text()
            $('.ui-qscontent').eq($index).addClass('active').siblings().removeClass('active');
            $('.ui-qfirst').text(val);
    })
    // 问题的选择item
    $('.ui-qscontent li').not('.ui-qscategory').on('click',function(){
        var val=$(this).text();
        $(this).addClass('active').siblings().removeClass('active');
        $('.ui-qsecond').text(val);
    })

    // 点赞后的状态
    $('#j-zan').on('click', function() {
            $(this).html('谢谢你的赞').addClass('ui-zaned').children().remove();
    });
    // 满意度评分
    (function(){
        var $star=$('.icon-like');
        for(var i=0, len=$star.length;i<len;i++){
            $star.eq(i).on('touchend',function(){
                clearStar($star);
                for(var j=0;j<=$(this).index();j++){
                    $star.eq(j).css({
                        backgroundPosition:'-.18rem -2.18rem'
                    }) 
                }
            })
        }
    })()
    function clearStar(iNode){
        for(var i=0 ;i<iNode.length;i++){
            iNode.eq(i).css({
                backgroundPosition:'-.55rem -2.18rem'
            })
        }
    }
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
            var colH = $(this).find('li').height() * 3 + 3;
            if (proH > colH) {
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
                        var H = proH / 100;
                        $(this).parents('.ui-proname').next().stop().animate({
                            height: H + 'rem'
                        }, 'normal', 'linear');
                    } else {
                        $(this).parents('.ui-proname').next().stop().animate({
                            height: 1.2 + 'rem'
                        }, 'normal', 'linear');
                    }
                })
            }
        })
    })();

    // 图片上传的代码
    (function() {
        // 图片处理功能
        function PictureEdit() {

            this.imageWrap = $('#J_upload_box');
            this.uploadBtnWrap = $('#J_file_wrap');
            this.btnGroup = $('#J_btn_group');
            this.cropGroup = $('#J_crop_group');
            this.cropBox = $('#J_file_box');
            this.preImg = $('#J_file_box_img');
            this.cropImg = null;

            this.uploadBtn = $('#J_file');
            this.cropBtn = $('#J_crop');
            this.cancelCropBtn = $('#J_cancel');

            this.pics = {};
            this.cropOption = {
                aspectRatio: 4 / 3,
                guides: false,
                cropBoxResizable: false,
                cropBoxMovable: false,
                dragCrop: false,
                minContainerWidth: 200,
                minContainerHeight: 200
            };

            this.upload();

        }


        PictureEdit.prototype.submit = function() {
            $('.pure-button-primary').click(function() {
                alert('提交文本：' + $('textarea').val() + '  提交图片数量：' + $('.item').length);
            });
        };

        // 选择上传图片
        PictureEdit.prototype.upload = function() {
            var that = this;

            that.delPics();
            that.crop();
            that.changeCropScale();
            that.submit();

            that.uploadBtn.change(function() {
                if (this.files.length === 0) {
                    return;
                }
                var file = this.files[0];

                window
                    .lrz(file, { width: 600 }) // 展示预览图
                    .then(function(rst) {
                        that.showCropBox();

                        that.preImg.load(function() {
                            // 触发图像裁剪
                            that.preImg.cropper(that.cropOption);
                        });
                        that.preImg.attr('src', rst.base64);

                    })
                    .catch(function(err) {
                        that.hideCropBox();
                        alert('读取图像失败！');
                    })
                    .always(function() {

                    });
            });
        };

        // 显示裁剪框
        PictureEdit.prototype.showCropBox = function() {
            this.cropBox.show();
            this.btnGroup.show();
            this.cropGroup.show();
        };

        // 隐藏裁剪框
        PictureEdit.prototype.hideCropBox = function() {
            this.cropBox.hide();
            this.btnGroup.hide();
            this.cropGroup.hide();
            this.preImg.cropper('destroy');
        };

        // 处理上传图片(选择裁剪比例)
        PictureEdit.prototype.changeCropScale = function() {
            var that = this;
            that.cropGroup.on('change', 'input', function() {
                var scale = this.value.split('/');
                that.preImg.cropper('destroy');
                that.preImg.cropper($.extend(that.cropOption, { aspectRatio: scale[0] / scale[1] }));
            });

        };


        // 处理上传图片(裁剪，缩放)
        PictureEdit.prototype.crop = function() {
            var that = this;

            // 取消裁剪
            that.cancel();

            // 确认裁剪
            that.cropBtn.click(function() {
                that.addPics();
                that.hideCropBox();
            });

        };

        // 取消上传图片
        PictureEdit.prototype.cancel = function() {
            var that = this;
            that.cancelCropBtn.click(function() {
                that.hideCropBox();
            });
        };

        // 生成上传图片的key
        PictureEdit.prototype.getFileKey = function() {
            var str = '0123456789abcdefghijklmnopqrstuvwxyz',
                n = str.length,
                key = "",
                i = 1;
            while (i < n) {
                var a = Math.floor(n * Math.random());
                key += str.charAt(a);
                i++;
            }
            return key
        };

        // 添加上传的图片
        PictureEdit.prototype.addPics = function() {
            var thumb = $('<div class="item"><i>x</i></div>'),
                key = this.getFileKey(),
                data = '';

            this.cropImg = this.preImg.cropper('getCroppedCanvas', { width: 200, height: 200 });
            data = this.cropImg.toDataURL();
            thumb.css('backgroundImage', 'url(' + data + ')').attr('key', key);
            thumb.insertBefore(this.uploadBtnWrap);
            this.pics[key] = data.split(',').pop();


        };

        // 删除上传的图片
        PictureEdit.prototype.delPics = function() {
            var that = this;

            that.imageWrap.on('click', 'i', function() {
                var parent = $(this).parent('.item'),
                    key = parent.attr('key');
                parent.remove();
                delete that.pics[key];

            });

        };

        // 获取全部base64数据
        PictureEdit.prototype.getPicsData = function() {
            var arr = [];
            $.each(this.pics, function(i, n) {
                arr.push(n);
            });
            return arr.join(',');
        };

        new PictureEdit();

    })();



    // 清空历史记录
    $('.ui-empty').on('click', function() {
            $(this).parents('.ui-related-list').remove();
        })
        // 我的草稿滑动删除的效果
    function prevent_default(e) {
        e.preventDefault();
    }

    function disable_scroll() {
        $(document).on('touchmove', prevent_default);
    }

    function enable_scroll() {
        $(document).unbind('touchmove', prevent_default)
    }

    var x;
    $('.draf-item').on('touchstart', function(e) {
        $(this).css({ left: '0' });
        x = e.originalEvent.targetTouches[0].pageX
    }).on('touchmove', function(e) {
        e.preventDefault();
        var change = e.originalEvent.targetTouches[0].pageX - x
        change = Math.min(Math.max(-54, change), 0) // restrict to -54 left, 0 right
        e.currentTarget.style.left = change / 100 + 'rem';
        console.log('a');
    }).on('touchend', function(e) {
        var left = $(e.currentTarget).position().left / 100;
        var new_left;
        if (left < -.45) {
            new_left = '-.54rem'
        } else if (left > .45) {
            new_left = '.54rem';
        } else {
            new_left = '0'
        }
        $(e.currentTarget).animate({ left: new_left }, 100)
        enable_scroll()
    })
    $('.draf-item .deletebtn').on('touchend', function(e) {
        e.preventDefault();
        $(this).parents('li').slideUp('normal', function() {
            $(this).remove()
        })
    })
})
