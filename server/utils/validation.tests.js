const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {

it('should reject non string values', () => {
    var res = isRealString(98);
    expect(res).toBe(false);
});

it('should reject string values with empty spaces', () => {
    var res = isRealString('      ');
    expect(res).toBe(false);
});

it('should allow string with non spaces', () => {
    var res = isRealString('   andrew  ');
    expect(res).toBe(true);
});


});