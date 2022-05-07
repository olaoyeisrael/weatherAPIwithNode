const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));



app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/",(req, res)=>{

    // console.log(req.body.cityName);  -- This is used to get the input from tyhe form by the body parser
    const nameOfCity =req.body.cityName 

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+nameOfCity+"&appid=265a22b6f9c406383b487f5228174660&units=metric"
        https.get(url,(response)=>{
            // console.log(response);
    
            response.on("data",(data)=>{
                const weatherData = JSON.parse(data)
                const temp = weatherData.main.temp
                const des = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    
                // console.log(temp);
                // console.log(des);
                // console.log(weatherData);
                res.write("<p>The weather is currently " + des + ".</p>")
                res.write("<h1>The weather in " +nameOfCity + " is " +  temp + " degree celcius.</h1>")
                res.write("<img src= " +  imgUrl+">")
                // res.write("<a href="/">Back</a>")
                res.send()
                
            })
    
        })
    



    // console.log("Post Received");
})




app.listen(5000, ()=>{
    console.log("App is running on port 5000");
})