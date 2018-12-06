const expect = require('expect');

var {genrateMessage, genrateLocationMessage} = require('../utils/message');

describe('generateMessage', () => {
    it('generate correct message', () => {
        var from = 'Jen';
        var text = 'TEST GREETING';
        var message = genrateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generate location message', () => {
    it('should generate corrosponding location object', () => {
        var from = 'test';
        var latitude=15;
        var longitude = 19;
        URL ='https://www.google.com/maps?q=15,19';
        var message= genrateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        //expect(message).toMatchObject({from, URL});
    });
});