const path = require("path");
const express = require("express");

const port = process.env.PORT  || 3000
const publicPath = path.join(__dirname + '/../public')

var app = express();
app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log(`STARTING SERVER ON PORT ${port}`);
});

//console.log(__dirname + '/../public'); // here public and  server are at same level so we use ..                                       // and go one level up

console.log('this is absolute path :', + '\n' + publicPath); 
