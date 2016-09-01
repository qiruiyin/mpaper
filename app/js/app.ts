(function(){
	var catalog, // 栏目信息
		catalog_detail = [],
		banner_info; // 栏目信息列表
	$.ajax({
		type: "get",
		url: "http://api.ch-jht.com/Carousel",
		dataType : "jsonp",
		jsonp: "callback",
		success: function(data){
			banner_info = data.Data[0];
			getCatalog();
		}
	});
	var tabs = function(data_title, data_content){
		new Vue({
			el: '#mpaper',
			data: {
				iscur: 0,
				isShow: -1,
				banner_info: banner_info,
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
						_this.contents = catalog_detail[id];
				    } else {
				    	$.ajax({
							type: "get",
							url: "http://api.ch-jht.com/Detail/" + catalog.Data[i].id,
							dataType : "jsonp",
							jsonp: "callback",
							success: function(data){
								var id = catalog.Data[i].id;
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
			url: "http://api.ch-jht.com/Menu",
			dataType : "jsonp",
			jsonp: "callback",
			async: false,
			success: function(result){
				catalog = result;
				$.ajax({
					type: "get",
					url: "http://api.ch-jht.com/Detail/" + catalog.Data[0].id,
					dataType : "jsonp",
					jsonp: "callback",
					async: false,
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

