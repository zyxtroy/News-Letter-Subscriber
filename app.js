const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstname = req.body.fName;
  const lastname = req.body.sName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status:"subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/d66287c2d2";

  const options = {
    method: "POST",
    auth: "zyxtroy:f09651dc8bae60c2d97cd34a2495dd3c-us14"
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200) {
      res.sendFile(__dirname +"/success.html");
    } else {
      res.sendFile(__dirname +"/failure.html");
    }



  })

  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req, res){
  res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

//API key: f09651dc8bae60c2d97cd34a2495dd3c-us14
//Audience ID: d66287c2d2
