const request = require('request')

const geocode = (address , callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWhtZWRuYXNzZXIiLCJhIjoiY2szc3g1YzhrMDlobzNkcDdsYTNmdXh1eCJ9._fjTsLPUs-xQOHHDmlhThA`

    request({ url:url , json:true } , (err , res) => {
        const features = res.body.features
        var msg = ''
        if(err){
            msg = 'unable to connect!'
            callback(msg , undefined)
        } else if(features.length === 0){
            msg = 'location not found!'
            callback(msg,undefined)
        } else{
            const data = {
                lat: res.body.features[0].center[1],
                long: res.body.features[0].center[0],
                location:res.body.features[0].place_name
            } 
            callback(undefined , data)
        }
    })
}

module.exports = geocode