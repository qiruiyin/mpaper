(function(){
	var catalog, // 栏目信息
		catalog_detail = [],
		dth = 0; // 栏目信息列表
	init();

	function init(){
		var url = decodeURI(location.href);
			url = parseToJson(url);
		var id = url.id,
			title = url.title;

		$("title").html(title);

		$.ajax({
			type: "get",
			url: "http://api.ch-jht.com/api/Detail/read/id/" + id,
			dataType : "json",
			success: function(results){
				renderDom(title, results.Data);
			}
		});
	};

	function renderDom(title, lists){

		new Vue({
			el: '#details',
			data: {
				isShow: -1,
				msg: title,
				lists: lists
			},
			methods: {
				showMsg: function(i){
					this.isShow = i == this.isShow ? '-1' : i;
				}
			}
		});
	}

	// 获取url中的参数，并转化为json格式
	function parseToJson(url){
		var	url_json = {};
		url = url.split("?"),
		url = url[1].split('&');
		for(var i = 0;i<url.length;i++){
		    var str = url[i].split('=');
		    url_json[str[0]]=str[1];
		}
		return url_json;
	}
})();
