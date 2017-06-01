const KnowledgeAdapter = require('../src/adapter/knowledge')
const axios = require('axios')
const sinon = require('sinon')
const assert = require('chai').assert
const config = require('../src/config')

describe('Knowledge Adapter', function() {

    let sandbox

    beforeEach(function () {
        sandbox = sinon.sandbox.create()
    });

    afterEach(function () {
        sandbox.restore()
    })

    it('should PUT bulb to knowledge api', () => {
        const axiosPostStub = sandbox.stub(axios, "put").callsFake(() => {
            return Promise.resolve()
        })
        let bulb = {
            "summary": "samson tiffy",
            "uuid": 1,
        }
        KnowledgeAdapter.store("addBulb", bulb)
        sinon.assert.calledOnce(axiosPostStub)
        sinon.assert.calledWith(axiosPostStub, config.knowledge.url + "/bulbs", bulb)
    })

    it('should DELETE bulb at knowledge api', () => {
        const axiosPostStub = sandbox.stub(axios, "delete").callsFake(() => {
            return Promise.resolve()
        })
        let bulb = {
            "summary": "samson tiffy",
            "uuid": 1,
        }
        KnowledgeAdapter.store("deleteBulb", bulb)
        sinon.assert.calledOnce(axiosPostStub)
        sinon.assert.calledWith(axiosPostStub, config.knowledge.url + "/bulbs/" + bulb.uuid)
    })

});