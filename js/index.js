$(function () {
    //客服咨询
    $('.pre-sale').hover(function () {
        $('.ul1').fadeIn(300);
    },function () {
        $('.ul1').fadeOut(300);
    });
    //微信商场
    $('.after-sales').hover(function () {
        $('.nav-img').fadeIn(300);
    },function () {
        $('.nav-img').fadeOut(300);
    });

   
    

    
    $(window).resize(function () {
        // console.log(window.innerWidth);
        //隐藏显示搜索和滚动
        if (window.innerWidth <= 1200) {
            $('.search').css('display','none');
        }else{
            $('.search').css('display','flex');
        }
        if (window.innerWidth <= 1200) {
            $('.scroll_begin').css('display','none');
            $('.p1').css('display','none');
            $('.p2').css('display','none');
            $('.p3').css('display','none');
            $('.p1-1').css('display','block');
            $('.p2-2').css('display','block');
            $('.p3-3').css('display','block');
            $('.main_hid').css('display','none');
        }else{
            $('.scroll_begin').css('display','block');
            $('.p1').css('display','block');
            $('.p2').css('display','block');
            $('.p3').css('display','block');
            $('.p1-1').css('display','none');
            $('.p2-2').css('display','none');
            $('.p3-3').css('display','none');
            $('.main_hid').css('display','block');
        }
        if (window.innerWidth <= 1380) {
            $('.goods').addClass('goods2');
            $('.g2').addClass('g1');
            $('.l_main3').find('.g1').css('marginLeft',272);
        }
        else{
            $('.goods').removeClass('goods2');
            $('.g2').removeClass('g1');
            $('.l_main3').find('.g1').css('marginLeft',154);
        }

        //导航隐藏显示
        if (window.innerWidth <= 992) {
            $('.navbar-nav>li').off('mouseenter').unbind('mouseleave');
            $('.container_nav').css('padding','10px 0 10px 0');
            //响应式二级菜单
            $('.navbar-nav>li').click(function () {
                let $navX = $(this).children(".nav-x");
                $navX.slideToggle(500);
                let $navXs = $(this).siblings().children(".nav-x");
                $navXs.slideUp(500);
            });
            $('.p1-1').css('display','none');
            $('.p2-2').css('display','none');
            $('.p3-3').css('display','none');
            $('.px1-1').css('display','block');
            $('.px2-2').css('display','block');
            $('.px3-3').css('display','block');
            $("#l_carousel").css("paddingTop","70px");
        }else{
            $('.navbar-nav>li').hover(function () {
                let $navC = $(this).children(".nav-c");
                $navC.stop().css('display','block').animate({opacity:1,top:"45px"});
            },function () {
                let $navC = $(this).children(".nav-c");
                $navC.stop().animate({opacity:0,top:"30px"}).css('display','none');
            });

            $('.px1-1').css('display','none');
            $('.px2-2').css('display','none');
            $('.px3-3').css('display','none');
            $("#l_carousel").css("paddingTop","125px");
        }

        if (window.innerWidth >= 990) {
            let $navX = $('.navbar-nav>li').children(".nav-x");
            $('.navbar-nav>li').off('click');
            $navX.css('display','none');
            $('.container_nav').css('padding','0');
        }
        
    }).trigger('resize');

    //滚动条
    let timer = setInterval(autoPlay,100);
    function autoPlay() {
        let $tbp = $('.tbp').innerWidth();
        $('.tbp').animate({left:-$tbp},15000,'linear',function () {
            $('.tbp').css('left',$('.scroll_begin').innerWidth());
        });
    }

    //背景图滚动
    $(window).scroll(function () {
        $('.l_main_bg1').css('background-position-y',getSpace($('.l_main_bg1')));
        $('.l_main_bg2').css('background-position-y',getSpace($('.l_main_bg2')));
        $('.l_main_bg3').css('background-position-y',getSpace($('.l_main_bg3')));
    })
    
    function getSpace($ele) {
        return ($ele.offset().top - $(window).scrollTop()) / 10 + 'px';
    };

    //滚动展示
    wow = new WOW({
        animateClass:'animated',
    });
    wow.init();

    //返回顶部
    var begin = 0, end = 0;
    $(window).scroll(function () {
        $(this).scrollTop() > 300 ? $(".return-top").fadeIn(1000) : $(".return-top").fadeOut(1000);
        begin = parseInt(Math.ceil($(window).scrollTop()));
        console.log(begin);
    });

    $(".return-top").click(function () {
        var timer = null;
        clearInterval(timer);

        timer = setInterval(function () {

            begin += (end - begin) * 0.2;

            window.scrollTo(0,begin);
            console.log(begin);

            if (begin === end) {
                clearInterval(timer);
            }
        },20);
    })
    
})  