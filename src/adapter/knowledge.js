const axios = require('axios')
const config = require('../config')

module.exports = {

    store: (type, payload) => {
        console.log("sending update to database", type, payload.data)
        let promise

        axios.defaults.headers.common['Authorization'] = "Bearer: " + payload.auth.token;

        // I hate if cases ...
        if (type === "deleteBulb")
            promise = axios.delete(config.knowledge.url + '/' + payload.auth.user + '/bulbs/' + payload.data.uuid)
        else
            promise = axios.put(config.knowledge.url + '/' + payload.auth.user + '/bulbs', payload.data)

        promise.then(() => {
            console.log("successfully send new item to knowledge api: " + JSON.stringify(payload.data))
        }).catch((err) => {
            console.log(err)
        })
    }

}