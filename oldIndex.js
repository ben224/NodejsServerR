// import {x} from './test.js';
// const x = require('./test');
// const y = require('./test');
// console.log(x);
// const os = require('os');
// console.log(os.arch());
// const fs = require('fs');
// console.log(os.cpus());

// fs.writeFile('./test.txt','fuck you',function(err){
//     console.log(err);
// })
// fs.readFile('./test.txt','utf8',function(err,data){
//     console.log(err);
//     console.log(data);
// })
// fs.unlink('./test.txt',function(err){
//     console.log(err);
// })
//web server架站
const http = require('http');
const server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/html');
    // res.setHeader('Content-Type','text/plain');
    // res.write('<h1>fuck you again ben</h1>');
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My HTML Sample</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a sample HTML page.</p>
</body>
</html>`);
    res.end();
})
server.listen(3000);








