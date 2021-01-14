
const request = require ('request')

const getData = (callback)=>{
    const url =`http://newsapi.org/v2/everything?q=bitcoin&from=2020-12-14&sortBy=publishedAt&apiKey=20b38283ad0749239224c8dedc7d505f`
    request({ url, json:true },(error, response)=>{
        if(error) {
            callback('error', undefined)
        }
        else{
            callback(undefined, response.body)
            console.log(response)
        }
    })

}

module.exports = getData