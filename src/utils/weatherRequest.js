const request = require('request')

const weatherRequest = (lat , long , callback) =>{
    const url = `https://api.darksky.net/forecast/be4250a713bf0684a1ab279edfae3533/${lat},${long}`

    request({ url:url , json:true } , (err , res) => {
        var msg = ''
        if(err){
            msg = 'unable to connect!'
            callback(msg,undefined)
        } else if(res.body.error){
            msg = 'location not found!'
            callback(msg,undefined)
        } else{
            const data = {
                temperature : res.body.currently.temperature,
                precipProbability : res.body.currently.precipProbability,
                todaySummery :  res.body.daily.data[0].summary
            }
            callback(undefined , `${data.todaySummery} It is currently ${data.temperature} out. we expect ${data.precipProbability}% of rain.`)
        }
    })
}

module.exports = weatherRequest