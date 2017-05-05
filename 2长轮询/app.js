var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req,res){
    if(req.url == '/time'){
        setInterval(function(){
            sendData(res);
        },2000)
    }
    if(req.url == '/'){
        fs.readFile('./lpc.html','binary',function(err,file){
            if(!err){
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(file,'binary');
                res.end();
            }
        })
    }
}).listen(8088,'localhost');
//用随机数模拟数据的变化
function sendData(res){
    var randomNum = Math.floor(10 * Math.random());
    console.log(randomNum);
    if(randomNum >= 0 && randomNum <= 5){
        res.end(new Date().toLocaleString())
    }
}
//在服务器端通过生成一个1-19之间的随机数来模拟判断数据是否发生了变化
//当随机数在0-5之间表示数据发生了变化，直接返回当前的日期，否则保持连接
//每隔两秒再进行检测.