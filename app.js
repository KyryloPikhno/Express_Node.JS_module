const fs = require('node:fs');


// fs.appendFile('./boys/Sasha.json', JSON.stringify({gender:'girl'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Vitalik.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Nikita.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./boys/Masha.json', JSON.stringify({gender:'girl'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./boys/Misha.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Vania.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Igor.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./boys/Ignat.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Lesha.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./boys/Tatiana.json', JSON.stringify({gender:'girl'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./boys/Elena.json', JSON.stringify({gender:'girl'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Nestor.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Andrey.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Pasha.json', JSON.stringify({gender:'boy'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Alena.json', JSON.stringify({gender:'girl'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Marina.json', JSON.stringify({gender:'girl'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Lesia.json', JSON.stringify({gender:'girl'}),(error)=>{
//     console.log(error);
// })
//
// fs.appendFile('./girls/Alisa.json', JSON.stringify({gender:'girl'}),(error)=>{
//     console.log(error);
// })


fs.readdir('./boys', (error, files) => {
    console.log(files)

    for (const fileName of files) {

        fs.stat(`./boys/${fileName}`, (error, stat) => {
            console.log(stat.isDirectory());

            if (stat.isFile()) {
                fs.readFile(`./boys/${fileName}`, (error, data) => {
                    const gender = JSON.parse(data.toString()).gender
                    if (gender === 'girl') {
                        fs.rename(`./boys/${fileName}`, `./girls/${fileName}`, (error) => {
                            console.log(error);
                        });
                    }
                });
            }
        });
    }
});

fs.readdir('./girls', (error, files) => {
    console.log(files);

    for (const fileName of files) {

        fs.stat(`./boys/${fileName}`, (error, stat) => {
            console.log(stat.isDirectory());

            if (stat.isFile()) {
                fs.readFile(`./girls/${fileName}`, (error, data) => {
                    const gender = JSON.parse(data.toString()).gender
                    if (gender === 'boy') {
                        fs.rename(`./girls/${fileName}`, `./boys/${fileName}`, (error) => {
                            console.log(error);
                        });
                    }
                });
            }
        });
    }
});


























