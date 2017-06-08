const KnowledgeAdapter = require('../src/adapter/knowledge')
const axios = require('axios')
const sinon = require('sinon')
const assert = require('chai').assert
const config = require('../src/config')

describe('Knowledge Adapter', function () {

    let sandbox

    beforeEach(function () {
        sandbox = sinon.sandbox.create()
    });

    afterEach(function () {
        sandbox.restore()
    })

    it('should PUT bulb to knowledge api', () => {
        const axiosPutStub = sandbox.stub(axios, 'put').callsFake(() => {
            return Promise.resolve()
        })
        let event = {
            data: {
                "summary": "samson tiffy",
                "uuid": 1,
            },
            auth: {
                user: "123",
                token: "token"
            }
        }

        KnowledgeAdapter.store("addBulb", event)
        sinon.assert.calledOnce(axiosPutStub)
        sinon.assert.calledWith(axiosPutStub, config.knowledge.url + "/123/bulbs", event.data)
        sinon.assert.match(axios.defaults.headers.common['Authorization'], "Bearer: token")
    })

    it('should DELETE bulb at knowledge api', () => {
        const axiosDeleteStub = sandbox.stub(axios, "delete").callsFake(() => {
            return Promise.resolve()
        })
        let event = {
            data: {
                "summary": "samson tiffy",
                "uuid": 1,
            },
            auth: {
                user: "123",
                token: "token"
            }
        }
        KnowledgeAdapter.store("deleteBulb", event)

        sinon.assert.calledOnce(axiosDeleteStub)
        sinon.assert.calledWith(axiosDeleteStub, config.knowledge.url + "/123/bulbs/" + event.data.uuid)
        sinon.assert.match(axios.defaults.headers.common['Authorization'], "Bearer: token")

    })

});