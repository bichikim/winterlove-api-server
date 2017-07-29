import {expect} from 'chai'
import {describe, it} from 'mocha'
import serverConfig from '../config/server'

describe('config server', () => {
    it('should be a object', () => {
        expect(serverConfig).to.be.a('object')
    })

    it('has a HOST', () => {
        expect(serverConfig.HOST).to.be.a('string')
    })
})
