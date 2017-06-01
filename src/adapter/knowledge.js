const axios = require('axios')
const config = require('../config')

module.exports = {

    store: (type, data) => {
        console.log("sending update to database", type, data)
        let promise
        // I hate if cases ...
        if ( type === "deleteBulb" )
            promise = axios.delete(config.knowledge.url + '/bulbs/' + data.uuid)
        else
            promise = axios.put(config.knowledge.url + '/bulbs', data)

        promise.then(() => {
            console.log("successfully send new item to knowledge api: " + JSON.stringify(data))
        }).catch((err) => {
            console.log(err)
        })
    }

}