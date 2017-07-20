import {Server} from 'hapi'
import Inert from 'inert'
import {expect} from 'chai'
import {describe, it} from 'mocha'
import {register, start} from '../src/lib/server-initializer'
import Controllers from '../src/plugins/controllers'
import App from '../src/plugins/app'

describe('controllers', () => {
    it('should be a function', () => {
        expect(Controllers).to.be.a('function')
    })

    it('has a attributes', () => {
        expect(Controllers.attributes).to.be.a('object')
        const {name, version} = Controllers.attributes
        expect(name).to.be.a('string')
        expect(name).equal('controllers')
        expect(version).to.be.a('string')
    })

    it('run as a hapi plugin ', (done) => {
        const server = new Server()
        const registerPlugins = async function() {
            // Needs Inert for App
            await register(server, Inert)
            // Needs App for Controllers
            await register(server, App)
            await register(server, Controllers)
        }

        registerPlugins().then(() => {
            const webServer = server.select(server.plugins.app.config.server.labels)
            webServer.route([
                {
                    method: 'get',
                    path: '/',
                    handler: {
                        controller: {
                            name: 'HomeController',
                            method: 'index',
                        },
                    },
                },
            ])
            start(server).then(() => {
                done()
            })
        })
    })
})
