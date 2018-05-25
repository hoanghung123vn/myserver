var q=require("q");
var db=require("../common/database");

var conn=db.getConnection();
function getFriendById(id){
	if(id){
		var defer=q.defer();
		var query=conn.query('SELECT distinct id,email,first_name,last_name,updated FROM mydb.friends,mydb.users where friends.status=2 and users.id!=? and (friends.id_request=? or friends.id_response=?) and (users.id=friends.id_request or users.id=friends.id_response)',[id,id,id],function(err,friend){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(friend);

			}	
		});

		return defer.promise;
	}
		return false;
	
}
function deleteFriend(id,id_friend){
	if(id){
		var defer=q.defer();
		var query=conn.query('DELETE FROM friends WHERE (id_request=? and id_response=?) or(id_request=? and id_response=?)',[id,id_friend,id_friend,id],function(err,user){
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

function addFriend(id,id_friend){
	if(id){
		var defer=q.defer();
		var query=conn.query('INSERT INTO friends (id_request,id_response,status,updated) VALUES (?,?,1,?);',[id,id_friend,new Date()],function(err,user){
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

function getRequestById(id){
	if(id){
		var defer=q.defer();
		var query=conn.query('SELECT distinct id,email,first_name,last_name,updated FROM mydb.friends,mydb.users where friends.status=1 and users.id!=? and friends.id_response=? and users.id=friends.id_request',[id,id,id],function(err,request){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(request);

			}	
		});

		return defer.promise;
	}
		return false;
}

function deleteRequest(id,id_request){
	if(id){
		var defer=q.defer();
		var query=conn.query('DELETE FROM friends WHERE id_request=? and id_response=?',[id_request,id],function(err,request){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(request);

			}	
		});

		return defer.promise;
	}
	return false;
}

function acceptRequest(id,id_request){
	if(id){
		var defer=q.defer();
		var query=conn.query('UPDATE friends SET status=2 WHERE id_request=? and id_response=?',[id_request,id],function(err,request){
			if(err){
				defer.reject(err);
				
			}else {
				defer.resolve(request);

			}	
		});

		return defer.promise;
	}
	return false;
}

module.exports={
	getFriendById:getFriendById,
	deleteFriend:deleteFriend,
	addFriend:addFriend,
	getRequestById:getRequestById,
	deleteRequest:deleteRequest,
	acceptRequest:acceptRequest
}