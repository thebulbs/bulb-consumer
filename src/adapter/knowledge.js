const axios = require('axios')
const config = require('../config')

module.exports = {

    // TODO: destruct (fucking what without internet)
    store: (data) => {
        return axios.put(config.knowledge.url + '/bulbs', data).then(() => {
            console.log("successfully send new item to knowledge api: " + JSON.stringify(data))
        }).catch((err) => {
            console.log(err)
        })
    }

}