module.exports = {

    knowledge : {
        url: process.env.KNOWLEDGE_URL || "http://127.0.0.1:8080"
    },

    eventstore: {
        endpoint: process.env.EVENTSTORE_ENDPOINT || "tcp://eventstore-25f46711.e084dea4.svc.dockerapp.io/:1113"
    }

}
