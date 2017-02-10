import { assert } from 'chai';
import utils from '../src/js/utils';

describe('Utils', () => {
    it('exports an Object', () => {
        assert(utils instanceof Object, 'Utils doesn\'t export Object as expected');
    });

    describe('xhrGet', () => {
        it('has utility function to make GET calls', () => {
            assert(utils.xhrGet instanceof Function, 'xhrGet function not defined');
        });

        it('has utility function to make GET calls', (done) => {
            const expectedData = {
                'test': 'a string'
            };

            utils.xhrGet('/base/test/data/test.json', (resp) => {
                resp.should.deep.equal(expectedData, 'XHR GET data not as expected');
                done();
            });
        });
    });

    describe('addClass', () => {
        it('can add classNames to elements', () => {
            let el = document.createElement('div');
            utils.addClass(el, 'test');
            assert(el.className.indexOf('test') > -1, 'failed to add a className to element');
        });

        it('will not add a className if it\'s already present', () => {
            let el = document.createElement('div');
            el.className = 'test';
            utils.addClass(el, 'test');
            assert(el.className === 'test', 'added a duplicate className');
        });
    });

    describe('removeClass', () => {
        it('can remove classNames to elements', () => {
            let el = document.createElement('div');
            el.className = 'test';

            utils.removeClass(el, 'test');
            assert(el.className.indexOf('test') === -1, 'failed to remove a className to element');
        });

        it('will only remove a className if it\'s a separate word', () => {
            let el = document.createElement('div');
            el.className = 'test-test';

            utils.removeClass(el, 'test');
            assert(el.className === 'test-test', 'incorrectly mutated a className');
        });
    });

    describe('toggleClass', () => {
        it('can toggle classNames on elements', () => {
            let el = document.createElement('div');
            utils.toggleClass(el, 'test');
            assert(el.className.indexOf('test') > 0, 'failed to toggle className on');

            utils.toggleClass(el, 'test');
            assert(el.className.indexOf('test') === -1, 'failed to toggle className off');
        });

        it('will only toggle a className if it\'s a separate word', () => {
            let el = document.createElement('div');
            el.className = 'test-test';

            utils.toggleClass(el, 'test');
            assert(el.className === 'test-test test', 'toggling on className failed');
        });
    });
});
