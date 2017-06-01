const client = require('node-eventstore-client')
const knowledge = require('./adapter/knowledge')
const config = require('./config')

const eventAppeared = (stream, event) => {
    knowledge.store(
        event.originalEvent.eventType,
        JSON.parse(event.originalEvent.data.toString())
    )
}

const liveProcessingStarted = () => {
    console.log("Caught up with previously stored events. Listening for new events.")
}

const subscriptionDropped = (subscription, reason, error) =>
    console.log(error ? error : "Subscription dropped.")

const credentials = new client.UserCredentials("admin", "changeit")

const settings = {
    verboseLogging: true
}
const endpoint = config.eventstore.endpoint
const connection = client.createConnection(settings, endpoint)

connection.connect().catch(err => console.log(err))

connection.once("connected", tcpEndPoint => {
    const subscription = connection.subscribeToStreamFrom(
        "knowledge",
        null,
        true,
        eventAppeared,
        liveProcessingStarted,
        subscriptionDropped,
        credentials
    )
    console.log(`Connected to eventstore at ${tcpEndPoint.host}:${tcpEndPoint.port}`)
    console.log(`subscription.isSubscribedToAll: ${subscription.isSubscribedToAll}`)
})

connection.on("error", err =>
    console.log(`Error occurred on connection: ${err}`)
)

connection.on("closed", reason =>
    console.log(`Connection closed, reason: ${reason}`)
)