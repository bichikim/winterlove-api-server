import controllers from '../src/controllers';
import {expect} from 'chai';
import {describe, it} from 'mocha';


describe('controllers', () => {
    it('should be a object', () => {
        expect(controllers).to.be.a('object');
    });
});