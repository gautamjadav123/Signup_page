const bodyParser = require("body-parser");
const express = require("express");
// const bodyParser = require("body-parser")
const request = require("request");
const https = require("https");
const app = express();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})


app.post("/",function(req,res){
    const Firstname = req.body.Fname;
    const Lastname = req.body.Lname;
    const Email = req.body.Email;
    

    var data ={
        members:{
            email_address: Email,
            status: "subscribe",
            merg_fields:{
              Fname:Firstname,
              Lname:Lastname
            }
        }
    };
    var jsonData = JSON.stringify(data);
    var url = " https://us21.api.mailchimp.com/3.0/lists/51d4b028a2";

    const options={
        methode:"POST",
        auth:"gautam:d06f3d90cfc688c87b2474b42ebf0ac2-us21"
    }

    const request = https.request(url, options, function(responce) {
        if (res.statusCode === 200) {
            res.sendFile(__dirname+"/success.html")
            
        } 
        else{
            res.sendFile(__dirname+"/failure.html")
        }


        responce.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})


   

app.listen(3000, function ()   {  
    console.log("server is running in port 3000.");
})
 



 