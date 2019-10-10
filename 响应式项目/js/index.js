
var galleryTop = new Swiper('.tab', {
    spaceBetween: 10,
    onSlideChangeStart: function (swiper) {
        $(".swiper-slide .tab-txt").eq(swiper.activeIndex).addClass("arror").parents(".swiper-slide").siblings().find(".tab-txt").removeClass("arror");
    },

});

var galleryThumbs = new Swiper('.oli', {
    spaceBetween: 10,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,//修改swiper的父元素时，自动初始化swiper
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;

//侧边栏
$(".nav-topbar i").click(function () {
    $("#main").addClass("show-left");
    $(".box-bg").css({ display: "block" });
})
$(".nav-topbar b").click(function () {
    $("#main").addClass("show-right");
    $(".box-bg").css({ display: "block" });
})
$(".box-bg").click(function () {
    $("#main").removeClass("show-right");
    $("#main").removeClass("show-left");
    $(".box-bg").css({ display: "none" });
})
$(".menuClose").click(function () {
    $("#main").removeClass("show-right");
    $("#main").removeClass("show-left");
    $(".box-bg").css({ display: "none" });
})


//下拉
$(".games").hover(function () {
    $(".games-select").stop().slideToggle(400);
})
$(".games-select").hover(function(){
    $(this).stop().slideToggle(400);
})

//导航栏 吸附顶部
$(document).on("scroll", function () {
    if ($(this).scrollTop() >= 90) {
        $(".nav").addClass("fixed");
    } else {
        $(".nav").removeClass("fixed");
    }
})
//侧边栏滑过
$(".sidebar .weixin").hover(function () {
    $(".sidebar .pro").stop().slideToggle(400);
})
$(".sidebar .qq").hover(function () {
    $(".sidebar .pro1").stop().slideToggle(400);
})

//新闻页
$.ajax({
    type: "get",
    url: "json/xinwen.json",
    success: function (data) {
        console.log(data.xinwen);
        for (var i = 0; i < 3; i++) {
            var newst = $(`
            <a href="#">
                <img src="${data.xinwen.news[i].img}" alt="">
                <p>${data.xinwen.news[i].txt}</p>
            </a> 
            `)
            $(".news-top").append(newst);
        }
        for(var j=0; j<data.xinwen.news.length; j++){
            main(j)
        }
        function main(j){
            var newsf = $(`
                <a href="#">
                    <div class="left">
                        <img src="${data.xinwen.news[j].img}" alt="">
                    </div>
                    <div class="right">
                        <h4>${data.xinwen.news[j].title}</h4>
                        <p>
                            ${data.xinwen.news[j].txt}
                        </p>
                        <span>${data.xinwen.news[j].time}</span>
                    </div>
                </a>
            `)
            $(".news-footer").append(newsf)
        }
        //tab切换
        $(".news-center a").click(function(){
            $(this).addClass("active").siblings().removeClass("active");

            if($(".news-center a").eq($(this).index()).html() == "新闻"){
                $(".news-footer").html("");
                for(var k = 0; k<data.xinwen.news.length;k++){
                    if(data.xinwen.news[k].tab == true){
                       main(k) 
                    }
                }
            }else if($(".news-center a").eq($(this).index()).html() == "最新"){
            $(".news-footer").html("");
                for(var i=0;i<data.xinwen.news.length;i++){
                    main(i);
                }
            }else if($(".news-center a").eq($(this).index()).html() == "版本"){
            $(".news-footer").html("");
                for(var i=0;i<data.xinwen.news.length;i++){
                    if(data.xinwen.news[i].banben == true){
                      main(i);  
                    }
                }
            }
        })  
    }
});
