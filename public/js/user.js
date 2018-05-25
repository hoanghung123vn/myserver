function User(){
	function bindEvent(){
		$(".user_edit").click(function(event) {
			var params={
				id:$(".id").val(),
				email:$(".email").val(),
				password:$(".password").val(),
				first_name:$(".first_name").val(),
				last_name:$(".last_name").val(),
				account:$(".account").val()
			};
			var base_url=location.protocol+"//"+document.domain+":"+location.port;
			$.ajax({
				url: base_url+"/admin/edit",
				type: "PUT",
				dataType: "json",
				data: params,
				success:function(res){
					if(res&&res.status_code==200){
						location.reload();
					}
				}
			});
			
			
		});
		$(".user_delete").click(function(event) {
			var user_id=$(this).attr("user_id");
			var base_url=location.protocol+"//"+document.domain+":"+location.port;
			$.ajax({
				url: base_url+"/admin/delete",
				type: "DELETE",
				dataType: "json",
				data: {id:user_id},
				success:function(res){
					if(res&&res.status_code==200){
						location.reload();
					}
				}
			});
		});
		$(".friend_delete").click(function(event) {
			var user_id=$(this).attr("friend_id");
			var base_url=location.protocol+"//"+document.domain+":"+location.port;
			$.ajax({
				url: base_url+"/user/delete",
				type: "DELETE",
				dataType: "json",
				data: {id:user_id},
				success:function(res){
					if(res&&res.status_code==200){
						location.reload();
					}
				}
			});
		});

		$(".add_friend").click(function(event) {
			var id_friend=$(this).attr("id_friend");
			var base_url=location.protocol+"//"+document.domain+":"+location.port;
			$.ajax({
				url: base_url+"/user/addfriend",
				type: "POST",
				dataType: "json",
				data: {id:id_friend},
				success:function(res){
					if(res&&res.status_code==200){
						location.reload();
					}
				}
			});
		});

		$(".request_delete").click(function(event) {
			var user_id=$(this).attr("delete_id");
			var base_url=location.protocol+"//"+document.domain+":"+location.port;
			$.ajax({
				url: base_url+"/user/deleterequest",
				type: "DELETE",
				dataType: "json",
				data: {id:user_id},
				success:function(res){
					if(res&&res.status_code==200){
						location.reload();
					}
				}
			});
		});

		$(".request_accept").click(function(event) {
			var id_friend=$(this).attr("accept_id");
			var base_url=location.protocol+"//"+document.domain+":"+location.port;
			$.ajax({
				url: base_url+"/user/accept",
				type: "POST",
				dataType: "json",
				data: {id:id_friend},
				success:function(res){
					if(res&&res.status_code==200){
						location.reload();
					}
				}
			});
		});
	}

	bindEvent();
}

$(document).ready(function() {
	new User();

});