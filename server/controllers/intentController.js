var mongoose = require('mongoose');
var request = require('request');

var client = require('../../config/wit');
var keys = require('../../config/keys');

var Plural = require('../../helpers/plural');

exports.addIntent = function(req,res){
    console.log("New Intent");
    res.status(200).json({message:"New Intent Added."});
}


exports.getIntent = function(req,res){
    console.log("Get Intent");
    client.message("What's the weather in Delhi?",{})
        .then((data)=>{
            if(data.entities){
                if(data.entities['location'] && data.entities['location'][0]['confidence']>0.7){
                    var city = data.entities['location'][0]['value'];
                    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys['weather']}`;
                    request(url, function (err, response, body) {
                        if(err){
                            console.log('error:', error);
                            res.status(500).json({error:error});
                        } else {
                            console.log('body:', JSON.parse(body));
                            body = JSON.parse(body);
                            var weathers;
                            body.weather.map((w,i)=>{
                                if(i==0){
                                    weathers = w.main;
                                }else{
                                    weathers +='and' + w.main;
                                }
                            });

                            var output = `Current weather condition${Plural(body.weather)[0]} of ${city} are ${weathers}. Temperature being ${(body.main.temp-273).toFixed(1)} degree Celsius and Atmospheric pressure at ${Math.floor(body.main.pressure/1000)} atm`
                            res.status(200).json({data:output});
                        }
                    })
                }

            }else{
                res.status(404).json({intent:"No Intent present"});
            }
        })
}
