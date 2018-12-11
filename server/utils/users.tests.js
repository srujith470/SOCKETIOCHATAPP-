const expect = require('expect');
const {Users} = require('./users');
describe('Users Test', () => {
    var users;
    beforeEach(() =>{
        users = new Users();
        users.users = [{
            id:1,
            name:'MIKE',
            room: 'NODE'
        },{
            id:2,
            name:'MIKEY',
            room: 'EXPRESS'
        },{
            id:3,
            name:'MIKEZ',
            room: 'MONGO'
        }]
    });
    it('it should add new user', () => {
        var users = new Users();
        var user = {
            id:123,
            name:'Andrew',
            room:'THE OFFICE'
        };
        var resUser = users.addUser(user.id, user.name,user.room);
        expect(users.users).toEqual([user]);
    });
    it('same room users list', () => {
        var userList = users.getUserList('NODE');
        expect(userList).toEqual(["MIKE"]);
    });

    it('should remove user', () => {
        var userId = 1;
        var user = users.removeUser(userId);

        expect(userId).toBe(userId);
        expect(users.users.length).toBe(2)

    });
    it('should not remove user', () => {
        var userId = 199;
        var user = users.removeUser(userId);

        expect(userId).toBeTruthy()
        expect(users.users.length).toBe(3)
    });
    it('get user', () => {
        var userId =2;
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });
    it('dont get user', () => {
        var userId =21;
        var user = users.getUser(userId);

        expect(user).toBe(undefined);

    });

});