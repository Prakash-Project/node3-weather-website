const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9c6e5b1fff1fddac07cda5f40e92dfb8/' + longitude + ',' + latitude
    
    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.error) {
            callback('unable to find forecast. Try another search', undefined)
        }else {
            callback(undefined, body.currently.summary + ". It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chances of rain" )
            // console.log("It is currently " + temp + " degrees out. There is a " + rain + "% chances of rain")
        }
    
    })    
}

module.exports = forecast
// const url = 'https://api.darksky.net/forecast/9c6e5b1fff1fddac07cda5f40e92dfb8/37.8267,-122.4233'

// request({url: url, json: true}, (error, response) => {
//     const currentData = response.body.currently 
//     const temp = currentData.temperature
//     const rain = currentData.precipProbability
    
//     console.log("It is currently " + temp + " degrees out. There is a " + rain + "% chances of rain")
// })