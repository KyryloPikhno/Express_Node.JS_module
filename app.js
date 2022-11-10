const fs = require('node:fs');

const builder = require('./ditTwo/test')


// fs.readFile('./text.txt', (error,data)=>{
//     console.log(error, 'error');
//
//     console.log(data.toString());
// })
//
// fs.appendFile('./text.txt', 'HELLO \n', (error) => {
//     console.log('err', error);
// });
//
// fs.writeFile('./text.txt', 'WRITE FILE',(error)=>{
//     console.log('ERROR',error);
// })
// fs.mkdir('./dir',(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./dir/file.json', JSON.stringify({user:'USER'}),(error)=>{
//     console.log(err);
// })
//
// fs.unlink('./dir/file.json',(error)=>{
//     console.log(error);
// })
//
// fs.rmdir('./dir',{recursive:true},(err)=>{
//     console.log(err);
// })
//
// fs.rename('./text.txt','./test.txt',(err)=>{
//     console.log(err);
// })
//
// fs.rename('./test.txt','./text.txt',(err)=>{
//     console.log(err);
// })
//
// fs.mkdir('./dir',(err)=>{
//     console.log(err);
// })
//
// fs.rename('./text.txt','./dir/test.txt',(err)=>{
//     console.log(err);
// })
//

let student = builder.builder('Kirill',25)

console.log(student)






























