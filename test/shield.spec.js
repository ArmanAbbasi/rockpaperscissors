import { assert } from 'chai';
import Shield from '../src/js/Shield';

describe('Shield', () => {
    let shield;
    const el = document.createElement('div');
    el.id = 'shield';
    document.body.appendChild(el);

    beforeEach(() => {
        shield = new Shield;
    });

    it('exports a constructor function before being initialised with new operator', () => {
        assert(Shield instanceof Function, 'Shield is doesn\'t return constructor function');
    });

    it('created an instance when initialised with new operator', () => {
        assert(shield instanceof Object, 'Instance not created');
    });

    it('sets the correct attribute when shield element is present', () => {
        assert(shield._shield instanceof Element, 'Failed to set internal shield attribute');
        assert.equal(shield._shield.outerHTML, el.outerHTML, 'Found shield element not as expected');
    });

    it('properly hides the container element when calling hide', (done) => {
        shield.hide();
        assert(shield._shield.classList.contains('transparent'), 'transparent className wasn\'t added');
        assert(!shield._shield.classList.contains('hidden'), 'hidden className added too early');
        setTimeout(() => {
            assert(shield._shield.classList.contains('hidden'), 'hidden className wasn\'t removed');
            done();
        }, 500);
    });

    it('properly shows the container element when calling display', (done) => {
        shield.display();
        assert(!shield._shield.classList.contains('hidden'), 'shield sill contain hidden className');
        assert(shield._shield.classList.contains('transparent'), 'transparent className removed too early');
        setTimeout(() => {
            assert(!shield._shield.classList.contains('transparent'), 'shield sill contain transparent className');
            done();
        }, 0);
    });
});
