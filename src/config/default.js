module.exports = {

    knowledge : {
        url: process.env.KNOWLEDGE_URL || "http://127.0.0.1:8080"
    },

    eventstore: {
        url: process.env.EVENTSTORE_URL || "http://127.0.0.1:2113/streams/knowledge"
    }

}
