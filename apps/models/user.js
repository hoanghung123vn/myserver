var q=require("q");
var db=require("../common/database");

var conn=db.getConnection();

function addSignUp(signup){
	if(signup){
		var defer=q.defer();
		var query=conn.query('INSERT INTO users SET ?',signup,function(err,result){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(result);

			}	
		});

		return defer.promise;
	}
	return false;
}

function getUserByEmail(email){
	if(email){
		var defer=q.defer();
		var query=conn.query('SELECT * FROM users WHERE ?',{email:email},function(err,result){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(result);

			}	
		});

		return defer.promise;
	}
	return false;
}

function getAllUser(){

		var defer=q.defer();
		var query=conn.query('SELECT * FROM users',function(err,users){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(users);

			}	
		});

		return defer.promise;
	
}

function getUserById(id){
	if(id){
		var defer=q.defer();
		var query=conn.query('SELECT * FROM users WHERE ?',{id:id},function(err,user){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(user);

			}	
		});

		return defer.promise;
	}
	return false;
}

function updateUser(params){
	if(params){
		var defer=q.defer();
		var query=conn.query('UPDATE users SET email=?,password=?,first_name=?,last_name=?,updated_at=?,account=? WHERE id=?',
			[ params.email,params.password,params.first_name,params.last_name,new Date(),params.account,params.id ],function(err,user){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(user);

			}	
		});

		return defer.promise;
	}
	return false;
}

function deleteUser(user_id){
	if(user_id){
		var defer=q.defer();
		var query=conn.query('DELETE FROM users WHERE id=?',user_id,function(err,user){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(user);

			}	
		});

		return defer.promise;
	}
	return false;
}

module.exports={
	addSignUp:addSignUp,
	getUserByEmail:getUserByEmail,
	getAllUser:getAllUser,
	getUserById:getUserById,
	updateUser:updateUser,
	deleteUser:deleteUser
}