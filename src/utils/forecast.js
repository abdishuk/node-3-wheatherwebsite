const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url2='http://api.weatherstack.com//current?access_key=bf72eec7ac16b7e24ad5d609fd7affaf&query=' +latitude + ',' +longitude + '&units=m'
    request({url:url2,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to forecast  services',undefined)
        } else if(response.body.error){
            callback('invalid data',undefined)
        }
        else{
            callback(undefined,'it is currently '+ response.body.current.temperature + ' degrees it feels like '+response.body.current.feelslike +' degrees out.' + ' The current humidity is ' + response.body.current.humidity + "%")
        }
    })
}
/*const geocode=(address,callback)=>{


}*/
module.exports=forecast