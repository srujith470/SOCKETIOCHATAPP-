// Jan 1970 00:00:00 is 0 timestamp in unix time system(UTC)

// -1000 time stamp is december 31 1969 11:59:59

// 1000 is Jan1 1970 00:00:01

// here 1000 is one second

var moment = require('moment')
var date = moment();
var createdAt = 1234;
var date1 = moment(createdAt);
var someTimestamp = moment().valueOf();
// var date = new Date().getMonth();
// console.log(date);

// console.log('moment date',date.format());
// console.log('moment date with MMM', date.format('MMM'));
// console.log('moment date with MMM, YYYY and DD', date.format('MMM YYYY DD'));

// console.log('moment date with MMM, YYYY and Do', date.format('MMM YYYY Do'));
date.add(10, 'year').subtract(10, 'year')
console.log( date.format('MMM YYYY DD'));

console.log(date.format('h:mm a')); 
console.log(date1.format('h:mm a')); 
console.log(someTimestamp)
