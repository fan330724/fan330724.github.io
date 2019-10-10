$(function () {
	//顶部下拉
	$(".xiazai").hover(function () {
        $(".select").stop(true).fadeIn(500);
    }, function () {
        $(".select").stop(true).fadeOut(500);
    })
	//搜索框
	var json = {}
	$('.inp-query').keyup(function () {
		$('.nav-search-div').stop(true).fadeIn(500);
		json = {
			wd: $('.inp-query').val(),
		}
		searchAjax(json);
	})
	function searchAjax(data) {
		$.ajax({
			type: "get",
			url: 'data/doubansearch.php',
			data: data,
			dataType: "json",
			success: function (data) {
				var str = "";
				for (var i = 0; i < data.length; i++) {
					str += "<li><div class = 'search-div-li'>" + "<div class='search-div-img'><img src=" + data[i].img + "></div>" + "<div class = 'search-div-p'><p>" + "<span>" + data[i].title + "</span><span>" + data[i].year + "</span></p>" + "<p>" + data[i].sub_title + "</p>" + "</div></div>"
					str += "</li>";
				}
				$(".nav-search-div").html(str);

				$('.nav-search-div li').mouseover(function () {
					$('.nav-search-div li').css('backgroundColor', '#fff')
					$(this).css('backgroundColor', '#f9f9f9')
				})
				$('.nav-search-div li').mouseout(function () {
					$('.nav-search-div li').css('backgroundColor', '#fff')
				})
			}
		})
	}
	$(document).click(function () {
		$('.nav-search-div').stop(true).fadeOut(500);
	})
	
	// 内容content
	//定义节流 
	var lock = true;
	//点击切换 数据 
	$('.tags li').click(function () {
		$('.tags li').css("background", "");
		$('.tags li').find('a').css("color", "#666");
		$(this).css("background", "#4b8ccb");
		$(this).find('a').css("color", "#fff");

		$('.list').html('');
		if (lock == true) {
			lock = false;
			json = {
				tag: $(this).find('a').html(),
				page_limit: 20,
				//tag:'热门',
			}
			contentAjax(json);

		} else {
			return;
		}

	})
	$('.tags li').eq(0).click()

	//封装获取内容函数
	function contentAjax(data) {
		$.ajax({
			url: "https://bird.ioliu.cn/v1?url=https://movie.douban.com/j/search_subjects",
			type: 'get',//type提交方式get或post
			data: data, //传参数
			success: function (data) {
				console.log(data)
				$.each(data.subjects, function (i,item) {
					// console.log(item)
					if (item.is_new == true) {
						var a = $(`<a class="item" href="#">
								<div class="cover-wp" data-isnew="${item.is_new}" data-id="${item.id}">
					                <img src="${item.cover}" alt="${item.title}" data-x="${item.cover_x}" data-y="${item.cover_y}">
					                <span class="num" style="display:none">${item.id}</span>
					            </div>
					            <p><span class="green"><img src="https://img3.doubanio.com/f/movie/caa8f80abecee1fc6f9d31924cef8dd9a24c7227/pics/movie/ic_new.png" width="16" class="new"></span>${item.title}&nbsp;&nbsp;<strong>${item.rate}</strong></p>
							</a>`)
					} else {
						var a = $(`<a class="item" href="#">
								<div class="cover-wp" data-isnew="${item.is_new}" data-id="${item.id}">
					                <img src="${item.cover}" alt="${item.title}" data-x="${item.cover_x}" data-y="${item.cover_y}">
					                <span class="num" style="display:none">${item.id}</span>
					            </div>
					            <p>${item.title}&nbsp;&nbsp;<strong>${item.rate}</strong></p>
							</a>`)
					}
					$('.list').append(a)
				})
				lock = true;
			},
		})
	}

	//点击加载更多
	var num = 0;
	$('.more').click(function () {
		$('.tags li').each(function () {
			if (lock == true) {
				lock = false;
				num++;
				json = {
					tag: $(this).find('a').html(),
					page_start: 20 * num,
				}
				contentAjax(json)
			} else {
				return;
			}
		})
	})

	setTimeout(function () {
		var json = {};
		var lock = true;
		$('.list-wp').on('mouseenter', '.item', function () {
			//console.log($(this).offset().top)
			//console.log($(this).offset().left+115)
			$(this).append(`<div class="detail-pop"></div>`);
			var itop = $(this).offset().top;
			var ileft = $(this).offset().left + 110;
			$('.detail-pop').css({ "display": "block", "top": itop + "px", "left": ileft + "px" })
			if (lock == true) {
				lock = false;
				json = {
					subject_id: $(this).find('.num').html(),
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
				//dataType:json,xml,script,html,jsonp//请求数据方式,默认json
				success: function (data) {
					//var datas=JSON.parse(data)
					//console.log(data.subject)
					var div = $(`
							 <div class="wp">
		            			<div class="info">
		               				<h3><a target="_blank" href="#">${data.subject.title}</a></h3>
		               				<p class="rank">
			                    		<span class="ll"></span>&nbsp;&nbsp;<strong>${data.subject.rate}</strong>
			                    	</p>
			                		<p class="meta">
			                        	<span class="green">可播放</span>
			                        	<span>${data.subject.duration}</span>
			                        	<span>${data.subject.region}</span>
			                        	<span>${data.subject.types[0]}</span>
			                        	<span>${data.subject.directors[0]}(导演)</span>
			                        	<span>${data.subject.actors[0]}</span>
			                        	<span>${data.subject.actors[1]}</span>
			                        	<span>${data.subject.actors[2]}</span>
			                        </p>
			                		<p class="collect-area">
			                			<a href="javascript:;" rel="nofollow" class="j a_collect_btn" name="sbtn-30163509-wish">想看</a>
			                			<a href="javascript:;" rel="nofollow" class="j a_collect_btn" name="sbtn-30163509-collect">看过</a>
			                		</p>
		                		</div>
		            			<p class="comment">${data.subject.short_comment.content}
			                		<span>- ${data.subject.short_comment.author}的短评</span>
		            			</p>
	            			</div>
							`)
					$('.detail-pop').append(div);
					//星星
					var grade = $('.rank').find('strong').html();
					console.log(grade);
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
		$('.list-wp').on('mouseleave', '.item', function () {
			$('.detail-pop').remove();
			$('.detail-pop').css({ "display": "none" })
		})
	}, 1000)
})