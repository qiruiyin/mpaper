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

	getCatalog();
	var tabs = function(data_title, data_content){
		new Vue({
			el: '#mpaper',
			data: {
				iscur: 0,
				isShow: -1,
				dth: dth,
				titles: data_title,
				contents: data_content
			},
			methods: {
				setCur: function(i, event){
					var _this = this,
					    id = event.currentTarget.getAttribute("data-id");	
				    _this.iscur = i;
				    _this.isShow = -1;

				    if (catalog_detail[id] != undefined) {
						_this.dth = id == 43 ? 1 : 0;
						_this.contents = catalog_detail[id];
				    } else {
				    	$.ajax({
							type: "get",
							url: "http://api.ch-jht.com/api/Detail/read/id/" + catalog.Data[i].id,
							dataType : "json",
							success: function(data){
								var id = catalog.Data[i].id;
								_this.dth = id == 43 ? 1 : 0;
								catalog_detail[id] = data.Data;
					    		_this.contents = data.Data;
							}
						});
				    }
				},
				showMsg: function(i){
				   this.isShow = i == this.isShow ? '-1' : i;
				}
			}
		});
	}
	function getCatalog(){
		$.ajax({
			type: "get",
			url: "http://api.ch-jht.com/api/Menu",
			dataType : "json",
			success: function(result){
				catalog = result;
				$.ajax({
					type: "get",
					url: "http://api.ch-jht.com/api/Detail/read/id/" + catalog.Data[0].id,
					dataType : "json",
					success: function(data){
						var id = catalog.Data[0].id;
						catalog_detail[id] = data.Data;
						tabs(result.Data, data.Data);
					}
				});
			},
			error: function(data){
				console.log("error", data);
			}
		});
	}
})();
