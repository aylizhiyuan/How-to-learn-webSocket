/**
 * Created by hama on 2017/4/29.
 */
var http=require('http');
var fs = require("fs");
var server=http.createServer(function(req,res){
    if(req.url=='/cors'){
        res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'http://localhost'});
        res.end(new Date().toString());
    }
    if(req.url=='/jsonp'){

    }
}).listen(8088,'localhost');
server.on('connection',function(socket){
    console.log("客户端连接已经建立");
});
server.on('close',function(){
    console.log('服务器被关闭');
});