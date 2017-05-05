/**
 * Created by hama on 2017/4/29.
 */
var http=require('http');
var url=require('url');
var server=http.createServer(function(req,res){
    if(/\/jsonp/.test(req.url)){
        var urlData=url.parse(req.url,true);
        var methodName=urlData.query.cb;
        res.writeHead(200,{'Content-Type':'application/javascript'});
        //res.end("<script type=\"text/javascript\">"+methodName+"("+new Date().getTime()+");</script>");
        res.end(methodName+"("+new Date().getTime()+");");
        //res.end(new Date().toString());
    }
}).listen(8088,'localhost');
server.on('connection',function(socket){
    console.log("客户端连接已经建立");
});
server.on('close',function(){
    console.log('服务器被关闭');
});