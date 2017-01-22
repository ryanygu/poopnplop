var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
var router = express.Router();
var path = '../../UofTHacks17-JSabJmeRy/';
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "pnp.donotreply@gmail.com",
        pass: "pooppoop123"
    }
});
var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.use("/",router);

app.get('/',function(req,res){
    res.sendFile('index.html', {'root': "../../"});
});

app.get('/index.html',function(req,res){
    res.sendFile('index.html', {'root': "../../"});
});

app.get('/index-forgot.html',function(req,res){
    res.sendFile('index-forgot.html', {'root': "../../"});
});

app.get('/index-login.html',function(req,res){
    res.sendFile('index-login.html', {'root': "../../"});
});

app.get('/index-main.html',function(req,res){
    res.sendFile('index-main.html', {'root': "../../"});
});

app.get('/index-need-poop.html',function(req,res){
    res.sendFile('index-need-poop.html', {'root': "../../"});
});

app.get('/index-register.html',function(req,res){
    res.sendFile('index-register.html', {'root': "../../"});
});

app.get('/send',function(req,res){
        rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
        to : req.query.to,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});
