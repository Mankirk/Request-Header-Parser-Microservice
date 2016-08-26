var express=require('express');
var fs=require('fs');
var useragent=require('useragent');
var app=express();

app.get ('/',function (req,res){
    console.log("request made for:"+req.url)
    
    
    console.log(useragent.parse(req.headers))
    var ip=useragent.parse(req.headers).source['x-forwarded-for'];
    
    var langString=useragent.parse(req.headers).source['accept-language'];
    var lang=langString.split(',')[0];
    
    var wanted= useragent.parse(req.headers).source['user-agent'];
    var beg=wanted.indexOf("(");
    var end=wanted.indexOf(")");
    
    var os=wanted.substring(beg+1,end);
    
    var toSend={
        IP:ip,
        language:lang,
        OS:os
    }
    res.json(toSend);
    
    
    console.log("this is wanted \n"+wanted);
    console.log(toSend);
    
});

app.listen(process.env.PORT || 8080,function(){
    console.log("listening on 8080");
});