const expect = require('expect');

var {genrateMessage} = require('../utils/message');

describe('generateMessage', () => {
    it('generate correct message', () => {
        var from = 'Jen';
        var text = 'TEST GREETING';
        var message = genrateMessage(from,text);

        expect(typeof message.createdAt).toBe('number')

        expect(message).toMatchObject({from,text});
    });
});