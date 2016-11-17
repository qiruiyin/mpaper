export function getMenuDetails(id) {
	let data;
	$.ajax({
		type: "get",
		url: "http://api.ch-jht.com/api/Detail/read/id/" + id,
		dataType : "json",
		async: false,
		success: function(results){
			data = results.Data;
		}
	});
	console.log(data);
	return data;
}