var express=require("express");
var router=express.Router();
var user_md=require("../models/user");
var friend_md=require("../models/friend");

router.get("/",function(req,res){
	if(req.session.user){
	var id=req.session.user.id;
    var data=friend_md.getFriendById(id);
    data.then(function(users){
    	var data={
    		users:users,
    		error:false
    	};
    	res.render("user/friendlist",{data:data});
    }).catch(function(err){
    	res.render("user/friendlist",{data:{error:"Get friend data is error"}});
    });
}else {
	res.redirect("/admin/signin");
}
});

router.delete("/delete",function(req,res){
	if(req.session.user){
		var friend_id=req.body.id;
		var id=req.session.user.id;
	var data=friend_md.deleteFriend(id,friend_id);
	if(!data){
		res.json({status_code:500});
	}else{
		data.then(function(result){
			res.json({status_code:200});
		}).then(function(err){
			res.json({status_code:500});
		});
	}
}else {
	res.redirect("/admin/signin");
}
	
});

router.get("/seachfriend",function(req,res){
	if(req.session.user){

		res.render("user/seachfriend",{data: {}});
	}else {
	res.redirect("/admin/signin");
}
});



router.post("/seachfriend",function(req,res){
	if(req.session.user){
		var email=req.body.email;

		if(email.trim().length==0){
		res.render("user/seachfriend",{data: {error:"Email is empty"}});
		}

		var data=user_md.getUserByEmail(email);
		data.then(function(users){
    		var data={
    			users:users,
    			error:false
    		};
    		res.render("user/seachfriend",{data:data});
   		 }).catch(function(err){
    		res.render("user/seachfriend",{data:{error:"Email is not exist"}});
   		 });
	}else {
		res.redirect("/admin/signin");
	}
});

router.post("/addfriend",function(req,res){
	if(req.session.user){
		var id_friend=req.body.id;
		var id=req.session.user.id;
		var data=friend_md.addFriend(id,id_friend);
		if(!data){
		res.json({status_code:500});
		}else{
			data.then(function(result){
				res.json({status_code:200});
			}).then(function(err){
				res.json({status_code:500});
			});
		}
	}else {
		res.redirect("/admin/signin");
	}
});

router.get("/request",function(req,res){
	if(req.session.user){
	var id=req.session.user.id;
    var data=friend_md.getRequestById(id);
    data.then(function(users){
    	var data={
    		users:users,
    		error:false
    	};
    	res.render("user/request",{data:data});
    }).catch(function(err){
    	res.render("user/request",{data:{error:"Get requests data is error"}});
    });
}else {
	res.redirect("/admin/signin");
}
});

router.delete("/deleterequest",function(req,res){
	if(req.session.user){
		var id_friend=req.body.id;
		var id=req.session.user.id;
	var data=friend_md.deleteRequest(id,id_friend);
	if(!data){
		res.json({status_code:500});
	}else{
		data.then(function(result){
			res.json({status_code:200});
		}).then(function(err){
			res.json({status_code:500});
		});
	}
}else {
	res.redirect("/admin/signin");
}
	
});

router.post("/accept",function(req,res){
	if(req.session.user){
		var id_friend=req.body.id;
		var id=req.session.user.id;
	var data=friend_md.acceptRequest(id,id_friend);
	if(!data){
		res.json({status_code:500});
	}else{
		data.then(function(result){
			res.json({status_code:200});
		}).then(function(err){
			res.json({status_code:500});
		});
	}
}else {
	res.redirect("/admin/signin");
}
});

module.exports=router;
