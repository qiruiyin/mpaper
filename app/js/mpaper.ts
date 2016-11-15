(function(){
	var catalog, // 栏目信息
		catalog_detail = [],
		dth = 0; // 栏目信息列表
	var weekday = ['日', '一', '二', '三', '四', '五', '六'],
		date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		week = date.getDay();
	$("title").html("海棠早班车[" + year + "." + month + "." + day + " 星期" + weekday[week] + "]");

	var getCatalog = function() {
		$.ajax({
			type: "get",
			url: "http://api.ch-jht.com/api/Menu",
			dataType : "json",
			success: function(result){
				init(result.Data, result.TopData);
			}
		});
	}

	getCatalog();

	function init (menu, msg) {
		new Vue({
			el: "#index",
			computed: {
				menus: function(){
					for (var i = menu.length - 1; i >= 0; i--) {
						if(menu[i].label == '财经热词') {
							menu[i].label = '经济解读';
							break;
						}
					}
					return this.sortData(menu);
				},
				msgs: function() {
					return this.sortData(msg);
				}
			},
			methods: {
				sortData: function(data){
					[4, 2, 1, 3].forEach(function(key, ind){
						data[ind]["sort"] = key;
					});
					return data;
				}
			}
		});

		var $menu = $(".mpaper-menu");
		$menu.height($menu.width());
		$menu.addClass("active");

		var mySwiper = new Swiper('.swiper-container', {
			direction: 'vertical',
			loop: true,
			autoplay: true,
			speed: 2000
		});
	}
	
})();
