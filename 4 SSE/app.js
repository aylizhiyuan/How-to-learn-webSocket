/**
 * Created by hama on 2017/4/29.
 */
var http=require('http');
var fs = require("fs");
var count=0;
var server=http.createServer(function(req,res){
    if(req.url=='/evt'){
        //res.setHeader('content-type', 'multipart/octet-stream');
        res.writeHead(200, {"Content-Type":"tex" +
        "t/event-stream", "Cache-Control":"no-cache",
            'Access-Control-Allow-Origin': '*',
            "Connection":"keep-alive"});
        var timer=setInterval(function(){
            if(++count==10){
                clearInterval(timer);
                res.end();
            }else{
                //里服务端发送的数据要遵循一定的格式，通常是id:（空格）数据（换行符）data：（空格）数据（两个换行符），如果不遵循这种格式，实际上客户端是会触发error事件的。这里的id是用来标识每次发送的数据的id,是强制要加的。
                res.write('id: ' + count + '\n');
                res.write("data: " + new Date().toLocaleString() + '\n\n');
            }
        },2000);

    };
    if(req.url=='/'){
        fs.readFile("./sse.html", "binary", function(err, file) {
            if (!err) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(file, "binary");
                res.end();
            }
        });
    }
}).listen(8088,'localhost');