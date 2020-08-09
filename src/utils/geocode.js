const request=require('request')

const geocode=(address,callback)=>{
    const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWJkaXNoYWt1cnN1bWF0cmEiLCJhIjoiY2tkNTRnaDdsMGF2ZjJ1cGg3MGJ0aXFzOCJ9.1UpTcNkUFN7j9UPX1aTEMw'
    request({url:url2,json:true},(error,response)=>{
        if(error){
            callback('unable to connect',undefined)
        }  else if(response.body.features.length===0){
            callback('invalid data',undefined)
        }
        else{
            callback(undefined,{latitude : response.body.features[0].center[1],longitude:response.body.features[0].center[0],location:response.body.features[0].place_name})
    
        }
    })
    }
    module.exports=geocode