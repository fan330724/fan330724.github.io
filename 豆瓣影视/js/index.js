$(function () {
    //顶部下拉
    $(".xiazai").hover(function () {
        $(".select").stop(true).fadeIn(500);
    }, function () {
        $(".select").stop(true).fadeOut(500);
    })
    //搜索框键盘按下
    var json = {}
    $('.inptxt').keyup(function () {
        $('.sou').stop(true).fadeIn(500);
        json = {
            //设置键值对
            wd: $('.inptxt').val(),
        }
        //调用函数
        searchAjax(json);
    })
    // 封装函数搜索数据
    function searchAjax(data) {
        $.ajax({
            type: "get",
            url: 'data/doubansearch.php',
            data: data,
            dataType: "json",
            success: function (data) {
                console.log(data)
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    str += "<li><img referrer='no-referrer|origin|unsafe-url' src=" + data[i].img + "><div class='xu'><p>" + data[i].title + "<span>" + data[i].year + "</span></p>" + "<span>" + data[i].sub_title + "</span>"
                    str += "</li>"
                }
                $(".ul").html(str);
            }
        })
    }
    $(document).click(function () {
        $('.sou').stop(true).fadeOut(500);
    })

    //封装获取数据正在上映函数
    function getJsonFn(url) {
        $.ajax({
            url: url,
            type: "get",
            dataType: "jsonp",
            success: function (data) {
                var arr = data.entries;
                var str = "";
                for (var i = 0; i < arr.length; i++) {
                    str += "<li id=" + arr[i].id + "><img src=" + arr[i].images.large + "><h3>" + arr[i].title + "</h3><p class='p'>" + "<span class='star'></span>" + "<span class='rate'>" + arr[i].rating + "</span>" + "</p><div class='btn'>选座购票</div>";
                    str += "</li>";
                }
                $(".listUl").html(str);
                //判断补充li
                if ($(".listUl li").length % 5 == 1) {
                    $(".listUl").append("<li></li><li></li><li></li><li></li>");
                }
                if ($(".listUl li").length % 5 == 2) {
                    $(".listUl").append("<li></li><li></li><li></li>");
                }
                if ($(".listUl li").length % 5 == 3) {
                    $(".listUl").append("<li></li><li></li>");
                }
                if ($(".listUl li").length % 5 == 4) {
                    $(".listUl").append("<li></li>");
                }

                //克隆前五个li标签
                $(".listUl").append($(".listUl li:lt(5)").clone(true));
                //判断评分
                for (var i = 0; i < $(".listUl li .rate").length; i++) {
                    var grade = $('.p').eq(i).find('.rate').html();
                    if (grade > 9) $('.star').eq(i).css('background-position', '0 0px')
                    else if (grade > 8) $('.star').eq(i).css('background-position', '0 -12px')
                    else if (grade > 7) $('.star').eq(i).css('background-position', '0 -23px')
                    else if (grade > 6) $('.star').eq(i).css('background-position', '0 -33px')
                    else if (grade > 5) $('.star').eq(i).css('background-position', '0 -45px')
                    else if (grade > 4) $('.star').eq(i).css('background-position', '0 -55px')
                    else if (grade > 3) $('.star').eq(i).css('background-position', '0 -66px')
                    else if (grade > 2) $('.star').eq(i).css('background-position', '0 -77px')
                    else if (grade > 1) $('.star').eq(i).css('background-position', '0 -88px')
                    else if (grade > 0) $('.star').eq(i).css('background-position', '0 -100px')
                    else if (grade == "") {
                        $('.star').eq(i).css('background-position', '0 -130px');
                        $(".star").eq(i).html("");
                        $(".rate").eq(i).html("暂无评分").addClass("ratee");
                    }
                }
            }
        })
    }
    //调用数据函数
    getJsonFn("http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a");

    //调用轮播图的哈数
    reyin();
    //封装轮播图函数
    function reyin() {
        //定义初始值  节流
        var index = 0;
        var cook = true;
        //开启定时器
        setInterval(function () {
            if (cook) {
                fun();
            }
        }, 6000)
        //鼠标移出  进入 
        $(".reyin").hover(function () {
            cook = false;
        }, function () {
            cook = true;
        })
        //左按钮点击
        $(".lbtn").click(function () {
            if ($(".listUl").is(":animated")) {
                return;
            }
            index--;
            if (index < 0) {
                $(".listUl").css({ left: -(8 * 700) + "px" });
                index = Math.ceil(($(".listUl li").length - 5) / 5)-1;
            }
            $(".index").html(index + 1);
            if ($(".index").html() == Math.ceil(($(".listUl li").length) / 5)) {
                $(".index").html(1);
            }
            $(".max").html(Math.ceil(($(".listUl li").length - 5) / 5));
            $(".listUl").animate({ left: -(index * 700) }, 500);
        })
        //右按钮点击
        $(".rbtn").click(function () {
            if ($(".listUl").is(":animated")) {
                return;
            }
            fun();
        })
        // 封装走一步函数
        function fun() {
            index++;
            if (index > ($(".listUl li").length - 5) / 5) {
                $(".listUl").css({ left: "0px" });
                index = 1;
            }
            $(".index").html(index + 1);
            if ($(".index").html() == Math.ceil(($(".listUl li").length) / 5)) {
                $(".index").html(1);
            }
            $(".max").html(Math.ceil(($(".listUl li").length - 5) / 5));
            $(".listUl").animate({ left: -(index * 700) }, 500);
        }
    }


    //封装获取即将上映数据函数
    function getJsonFn1(url) {
        $.ajax({
            url: url,
            type: "get",
            dataType: "jsonp",
            success: function (data) {
                var arr = data.entries;
                var str = "";
                for (var i = 0; i < arr.length; i++) {
                    str += "<li id=" + arr[i].id + "><img src=" + arr[i].images.large + "><p>" + arr[i].title + "<strong>" + arr[i].rating + "</strong>" + "</p>";
                    str += "</li>";
                }
                $(".listUl1").html(str);
            }
        })
    }
    //调用数据函数
    getJsonFn1("http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a");

    jijiang();

    function jijiang() {
        var num = 0;
        var cooke = true;
        //开启定时器
        setInterval(function () {
            if (cooke) {
                sore();
            }
        }, 5000)
        //鼠标移出  进入 
        $(".jijian").hover(function () {
            cooke = false;
        }, function () {
            cooke = true;
        })
        // //按钮点击
        $(".lbtn1").click(function () {
            if ($(".listUl1").is(":animated")) {
                return;
            }
            num--;
            if (num < 0) {
                $(".listUl1").css({ left: -(2 * 700) + "px" });
                num = 2;
            }
            $(".listUl1").animate({ left: -(num * 700) }, 500);
        })
        $(".rbtn1").click(function () {
            if ($(".listUl1").is(":animated")) {
                return;
            }
            sore();
        })
        function sore() {
            num++;
            if (num > 2) {
                $(".listUl1").css({ left: "0px" });
                num = 0;
            }
            $(".listUl1").animate({ left: -(num * 700) }, 500);
        }
    }

    //热门推荐
    $.ajax({
        url: "data/01.json",
        type: "get",
        dataType: "json",
        success: function (data) {
            var str = "";
            for (var i = 0; i < data.length; i++) {
                str += "<li>" + "<div class='left'>" + "<img src=" + data[i].path + ">" + "</div>" + '<div class="deta">' + "<h3>" + data[i].title + "</h3><p>" + data[i].text + "</p></div>"
                str += "</li>";
            }
            $(".slide").html(str);
            $(".slide").append($(".slide li:first").clone(true));
        }
    })

    //调用remen()函数  
    remen();
    //封装热门轮播函数
    function remen() {
        var index = 0;
        var cook = true;
        //开启定时器
        setInterval(function () {
            if (cook) {
                fun();
            }
        }, 5000)
        //鼠标移出  进入 
        $(".remen").hover(function () {
            cook = false;
        }, function () {
            cook = true;
        })
        // //按钮点击
        $(".lbtn2").click(function () {
            if ($(".slide").is(":animated")) {
                return;
            }
            index--;
            if (index < 0) {
                $(".slide").css({ left: -(7 * 675) + "px" });
                index = $(".slide li").length - 2;
            }
            $(".index1").html(index + 1);
            if ($(".index1").html() == 9) {
                $(".index1").html(1);
            }
            $(".max1").html($(".slide li").length - 1);
            $(".slide").animate({ left: -(index * 675) }, 500);
        })
        $(".rbtn2").click(function () {
            if ($(".slide").is(":animated")) {
                return;
            }
            fun();
        })
        //封装走一步函数
        function fun() {
            index++;
            if (index > $(".slide li").length - 1) {
                $(".slide").css({ left: "0px" });
                index = 1;
            }
            $(".index1").html(index + 1);
            if ($(".index1").html() == 9) {
                $(".index1").html(1);
            }
            $(".max1").html($(".slide li").length - 1);
            $(".slide").animate({ left: -(index * 675) }, 500);
        }
    }

    // 滑过正在热映的li的详情信息
    reyingli(".listUl", ".reyin", ".listUl li");

    //滑过即将上映的li的详情信息
    reyingli(".listUl1", ".jijian", ".listUl1 li");

    //封装获取详情页的函数
    function reyingli(ele, obj, fun) {
        setTimeout(function () {
            // console.log($('.cover-wp'));
            var json = {};
            var lock = true;
            $(ele).on('mouseenter', 'li', function () {
                $(obj).append(`<div class="detail-pop"></div>`);
                var itop = $(this).offset().top;
                var ileft = $(this).offset().left + 120;
                $('.detail-pop').css({ "display": "block", "top": itop + "px", "left": ileft + "px", })
                if (lock == true) {
                    lock = false;
                    json = {
                        subject_id: $(fun).eq($(this).index()).attr("id"),
                    }
                    setTimeout(function () {
                        IntheAjax(json);
                    }, 500)

                } else {
                    return;
                }
            })
            function IntheAjax(data) {
                $.ajax({
                    url: "https://bird.ioliu.cn/v1?url=https://movie.douban.com/j/subject_abstract",
                    type: 'get',//type提交方式get或post
                    data: data, //传参数
                    dataType: "json",//请求数据方式,默认json
                    success: function (data) {
                        console.log(data);
                        console.log(data.subject)
                        console.log(data.subject.actors.length)
                        var div = $(`
                         <div class="wp">
                            <div class="info">
                                <h3><a target="_blank" href="#">${data.subject.title}</a></h3>
                                <p class="rank">
                                <span class="ll"></span>&nbsp;&nbsp;<strong>${data.subject.rate}</strong>
                                </p>
                                <p class="meta">
                                    <span>${data.subject.duration}</span>
                                    <span>${data.subject.region}</span>
                                </p>
                                <p>
                                    <b>导演</b>
                                    ${data.subject.directors[0]}
                                </p>
                                <p>
                                    <b>主演</b>
                                    <span class='zhuyan'>
                                        ${data.subject.actors[0]}/
                                        ${data.subject.actors[1]}/
                                        ${data.subject.actors[2]}
                                    </span>
                                </p>
                            </div>
                        </div>
                        `)
                        $('.detail-pop').append(div)
                        //判断有没有主演
                        // console.log($(".zhuyan").html())
                        
                        //星星
                        var grade = $('.rank').find('strong').html();
                        if (grade > 9) $('.ll').css('background-position', '0 0px')
                        else if (grade > 8) $('.ll').css('background-position', '0 -15px')
                        else if (grade > 7) $('.ll').css('background-position', '0 -30px')
                        else if (grade > 6) $('.ll').css('background-position', '0 -45px')
                        else if (grade > 5) $('.ll').css('background-position', '0 -60px')
                        else if (grade > 4) $('.ll').css('background-position', '0 -75px')
                        else if (grade > 3) $('.ll').css('background-position', '0 -90px')
                        else if (grade > 2) $('.ll').css('background-position', '0 -105px')
                        else if (grade > 1) $('.ll').css('background-position', '0 -120px')
                        else if (grade > 0) $('.ll').css('background-position', '0 -135px')
                        lock = true;
                    },
                })
            }
            $(ele).on('mouseleave', 'li', function () {
                $('.detail-pop').remove();
                $('.detail-pop').css({ "display": "none" })
            })
        }, 1000)
    }
})
