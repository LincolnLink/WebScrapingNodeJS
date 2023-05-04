const express = require('express');
const pupperteer = require('puppeteer');

const server = express();

server.get('/', async (request, response) => {

    const browser = await pupperteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://www.alura.com.br/formacao-front-end');
    
    const pageContent = await page.evaluate(() =>{
        return{
            
            subtitle: document.querySelector('.formacao-headline-subtitulo').innerHTML,
            title:document.querySelector('.formacao-headline-titulo').innerHTML, 
            // width: document.documentElement.clientWidth,
            // height: document.documentElement.clientHeight,
            // deviceScaleFactor: window.devicePixelRatio
        };
    });

    console.log('pageContent:', pageContent);

    //Pegar dados da pagina da Alura.
    await browser.close();

    response.send({
        // "id": 33082,
        "subtitle": pageContent.subtitle,
        "title": pageContent.title,
    });
});

const port = 3000;

server.listen(port, ()=>{
    console.log(`
        Servidor subiu com sucessinhos!
        acesse em http://localhost:${port}    
    `);
});

//;(async ()=>{

    // const browser = await pupperteer.launch();
    // const page = await browser.newPage();
    // //await page.goto('https://example.com');
    // await page.goto('https://www.alura.com.br/formacao-front-end');
    // //await page.screenshot({path: 'example.png'});

    // await browser.close();
//})();






