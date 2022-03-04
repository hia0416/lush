$(function () {
    //menu
    $(".m_menu_btn").on("click", function () {
        $("#main_menu").stop().animate({
            "left": 0
        }, 500)
        $(this).css("display", "none");
        $(".m_menu_close").css("display", "block");
    })
    $(".m_menu_close").on("click", function () {
        $("#main_menu").stop().animate({
            "left": "-100%"
        }, 500)
        $(this).css("display", "none");
        $(".m_menu_btn").css("display", "block");
        $('.gnb_ttl').removeClass('active');
        $('.gnb_sub_ttl').removeClass('active');
    })

    $("#nav>li:lt(4)").on({
        'mouseover': function () {
            if (wWidth > 767) {
                $(".gnb_sub_wrap").stop().animate({
                    "height": "350px"
                }, 200)
            }
        },
        'mouseout': function () {
            if (wWidth > 767) {
                $(".gnb_sub_wrap").stop().animate({
                    "height": 0
                }, 300)
            }
        }
    })

    $(".gnb_sub_ttl>a").on('click', function (e) {
        e.stopPropagation();
        $(this).next(".sub_sub").slideToggle(300);
        $(this).parent().toggleClass('active');
        $(this).parent().parent().siblings().children().removeClass('active').children(".sub_sub").slideUp(300);
    })


    let wWidth;


    function initSize() {
        wWidth = $(window).outerWidth();
        $("#nav>li").on({
            'mouseenter': function () {
                if (wWidth > 767) {
                    $(this).children('.menu_list').stop().slideDown(500);
                }
            },
            'mouseleave': function () {
                if (wWidth > 767) {
                    $(this).children('.menu_list').stop().slideUp(200);
                }
            },
            'click': function () {
                if (wWidth <= 767) {
                    if ($(this).hasClass('active')) {
                        $(this).children('.menu_list').stop().slideUp(500);
                        $(this).removeClass("active");
                    } else {
                        $(this).children('.menu_list').stop().slideDown(500);
                        $(this).siblings().children('.menu_list').stop().slideUp(500);
                        $(this).addClass('active').siblings().removeClass('active');
                    }
                }
            }
        })
        $(".m_menu_close").trigger("click");
        $(".pick_modal_bg").removeClass("on");
        if(wWidth > 767){
            $(".item_box.gift_box").addClass("on");
        } else {
            $(".gift_item, .item_box, .hair_item").removeClass("on");
        }
    }

    initSize();

    $(window).on("resize", function () {
        wWidth = $(window).outerWidth();
        console.log("re" + wWidth);
        initSize();
    })

    //BEST
    $(".best_box").slick({
        dots: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [{
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows:false
            }
        }]
    })
    

    //main_banner
    let curIndex = 0;

    let timer = setInterval(moveBanner, 3000);

    function moveBanner() {
        if (curIndex < 2) {
            curIndex++;
        } else {
            curIndex = 0;
        }
        $(".banner>li").eq(curIndex).fadeIn(1000).siblings().fadeOut(1000);
        $("#main_banner>.pager>li").eq(curIndex).addClass('on').siblings().removeClass('on');
    }

    $("#main_banner>.pager>li").on("click", function () {
        var selectIndex = $(this).index();

        $(".banner>li").eq(selectIndex).fadeIn(1000).siblings().fadeOut(1000);

        $(this).addClass('on').siblings().removeClass('on');
    })

    $("#main_banner>.pager>li").on("mouseover", function () {
        clearInterval(timer);
    })
    $("#main_banner>.pager>li").on("mouseout", function () {
        timer = setInterval(moveBanner, 3000);
    })

    //여기까지 main_banner


    //best_item
    $(".best_item>a").on("mouseover", function () {
        $(this).children(".front_box").addClass("rotateOn");
        $(this).children(".back_box").addClass("rotateOn");
    })
    $(".best_item>a").on("mouseleave", function () {
        $(this).children(".front_box").removeClass("rotateOn");
        $(this).children(".back_box").removeClass("rotateOn");
    })

    $(".bb_btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).siblings(".best_item>a").trigger("mouseleave");
        } else {
            $(this).addClass("active");
            $(this).siblings(".best_item>a").trigger("mouseover");
            $(this).parents().siblings().children(".best_item>a").trigger("mouseleave");
            $(this).parents().siblings().children(".bb_btn").removeClass("active");
        }
    })


    // pick
    let selectIndex = $(this).index();
    $(".pick_gift .plus_more").on("click", function () {
        $(".pick_modal_bg").addClass("on");
        selectIndex = $(this).index();
        $(".gift_item").addClass("on");
        $(".gift_item .item_box").eq(selectIndex).addClass("on").siblings().removeClass("on");
    })

    $(".pick_hair .plus_more").on("click", function () {
        $(".pick_modal_bg").addClass("on");
        selectIndex = $(this).index();
        $(".hair_item").eq(selectIndex).addClass("on").siblings().removeClass("on");
    })

    $(".pick_modal_bg").on("click", function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        }
        $(".gift_item, .item_box, .hair_item").removeClass("on");
    })


    //up_down Btn
    let scrollY = $(this).scrollTop();
    $(window).on("scroll", function () {
        scrollY = $(this).scrollTop();
        if (scrollY < 500) {
            $("#up_down").stop().animate({
                right: "-100%",
                opacity: 0
            }, 500)
        } else {
            $("#up_down").stop().animate({
                right: "1%",
                opacity: 1
            }, 500)
        }
        scrollY = $(this).scrollTop();
        if (scrollY < 100) {
            $(".ktalk").stop().animate({
                right: "-100%",
                opacity: 0
            }, 500)
        } else {
            $(".ktalk").stop().animate({
                right: "1%",
                opacity: 1
            }, 500)
        }
    })
    $(".upBtn").on("click", function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: 0
        }, 400);
    })
    $(".downBtn").on("click", function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $(document).height()
        }, 400);
    })
})