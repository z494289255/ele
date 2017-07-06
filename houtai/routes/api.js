var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/project';

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.post('/reg',function(req,res){
	// 先要获取前端传过来的数据
    var name = req.body.name;
    var pwd = req.body.pwd;
    console.log(req)
    MongoClient.connect(DB_CONN_STR,function(err,db){
    	if(err){
    		console.log('数据库连接失败'+err);
    		res.send({code:-1,msg:'网络异常，请稍候重试'})
    	}else{
    		var conn = db.collection('users');
    		
    		conn.insertOne({name:name,password:pwd},function(err,info){
    			if(err){
    				console.log('注册失败'+err);
    				res.send({code:-2,msg:'注册失败'})
    			}else{
    				res.send({code:0,msg:'注册成功'})
    			}
    			db.close();
    		})
    	}
    })
})



module.exports = router;