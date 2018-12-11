// // BASICS FOR CLASSES ITS CONSTRUCTORS AND METHODS
// class Person {

//     constructor(name, age){
        
//         this.NAME = name;
//         this.AGE = age;
//         console.log(name, age);
//     } // specific to class and fires instance of classs to customize a person when it is created

//     getUserDescription () {
//         return `${this.NAME} is ${this.AGE} year(s) old`
//     } // method in class 
// }

// var me = new Person('andrew', 25); // new instance of class
// console.log('THIS IS NAME FROM OUTSIDE', me.NAME);
// var description = me.getUserDescription();
// console.log('THIS IS FROM METHOD', description);

class Users {
    constructor(){
        this.users = []
    }

    addUser(id, name, room) {
        var user= {id, name, room};
        this.users.push(user);
        return user;
    };
    getUser(id){
        return this.users.filter((user) =>  user.id===id)[0]

    };
    removeUser(id){
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id)
        }
        return user;
    };
    getUserList(room){
        var users = this.users.filter((user) => {
            return user.room === room
        });

        var namesArray = users.map((user) => {
           return user.name
        });

        return namesArray;
    };
};

module.exports ={Users}