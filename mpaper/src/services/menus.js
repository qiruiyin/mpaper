export function getMenus() {
	let data;
	$.ajax({
		type: "get",
		url: "http://api.ch-jht.com/api/Menu",
		dataType : "json",
		async: false,
		success: function(result){
			data = result;
		}
	});
	return data;
}