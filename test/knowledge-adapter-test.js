const KnowledgeAdapter = require('../src/adapter/knowledge')
const axios = require('axios')
const sinon = require('sinon')
const assert = require('chai').assert

describe('Knowledge Adapter', function() {

    let sandbox

    beforeEach(function () {
        sandbox = sinon.sandbox.create()
    });

    afterEach(function () {
        sandbox.restore()
    })

    it('should store event into knowledge database', () => {
        const axiosPostStub = sandbox.stub(axios, "put", () => {
            return Promise.resolve()
        })
        KnowledgeAdapter.store({
            "summary": "samson tiffy",
            "uuid": 1,
        })
        sinon.assert.calledOnce(axiosPostStub)
    })

    it('should retry if anything fails while sending backlog to knowledge', () => {

    })

});