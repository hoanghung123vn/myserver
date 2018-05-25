var express=require("express");
var router=express.Router();
var user_md=require("../models/user");
var helper=require("../helpers/helper");

router.get("/",function(req,res){
	if(req.session.user){
	if(req.session.user.account==3){
		var data=user_md.getAllUser();
    data.then(function(users){
    	var data={
    		users:users,
    		error:false
    	};
    	res.render("admin/dashboard",{data:data});
    }).catch(function(err){
    	res.render("admin/dashboard",{data:{error:"Get users data is error"}});
    });
	}
    
}else {
	res.redirect("/admin/signin");
}
});

router.get("/signup",function(req,res){
	res.render("signup",{data: {}});
});

router.post("/signup",function(req,res){
	var user=req.body;

	if(user.email.trim().length==0){
		res.render("signup",{data: {error:"Email is required"}});
		
	}
	if(user.passwd != user.repasswd && user.passwd.trim().length != 0){
		res.render("signup",{data:{error:"Password is not Match"}});
	}

	//Insert to db
	//var pw=helper.hash_password(user.passwd);

	signup = {
		email:user.email,
		password:user.passwd,
		first_name:user.firstname,
		last_name:user.lastname,
		updated_at:new Date(),
		account:1
	};
	var result=user_md.addSignUp(signup);

	result.then(function(data){
		//res.json({message:"Insert success"});
		res.redirect("/admin/signin");
	}).catch(function(err){
		console.log("error");
		res.render("signup",{data: {error:"error"}});
	});
	
});

router.get("/signin",function(req,res){
	res.render("signin",{data: {}});
});

router.post("/signin",function(req,res){
	var params=req.body;

	if(params.email.trim().length==0){
		res.render("signin",{data: {error:"Please enter an email"}});
	}else {
		var data=user_md.getUserByEmail(params.email);
		if(data){
			data.then(function(users){
				var user=users[0];
				//var status=helper.compare_password(params.password,user.password);

				if((params.password==user.password)&&(user.account==3)){
					req.session.user=user;
					console.log(req.session.user);
					console.log("Hello");
					res.redirect("/admin");
					
				}else if((params.password==user.password)&&(user.account==2)){
					req.session.user=user;
					console.log(req.session.user);
					console.log("Hello");
					res.redirect("/user");
				}else {
					res.render("signin",{data: {error:"Password wrong"}});
				}
			});
		}else {
			res.render("signin",{data: {error:"User is not exists"}});
		}
	}
});
router.get("/edit/:id",function(req,res){
	if(req.session.user.account==3){
		var params=req.params;
	var id=params.id;

	var data=user_md.getUserById(id);
	if(data){
		data.then(function(users){
			var user=users[0];
			var data={
				user:user,
				error:false
			};
			res.render("admin/edit",{data:data});
		}).catch(function(err){
			res.render("admin/edit",{data:{error:"Could not get user by id"}});
		});
	}else {
		res.render("admin/edit",{data:{error:"Could not get user by id"}});
	}
}else {
	res.redirect("/admin/signin");
}
	
});

router.put("/edit",function(req,res){
	if(req.session.user.account==3){
		var params=req.body;
		var data=user_md.updateUser(params);
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

router.delete("/delete",function(req,res){
	if(req.session.user.account==3){
		var user_id=req.body.id;
	var data=user_md.deleteUser(user_id);
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