# WebScrapingNodeJS

 - Uma tentativa de criar um Web Scraping com Node JS

 - Fonte: https://www.youtube.com/watch?v=xianIw6PleE&t=900s

 - Canal do professor: https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA

# libs

 - Express (BackEnd).
 - Puppeteer (Para fazer o Scraping e pegar dados).

# Estruturando o ambiente.

 - Primeiro executa o comando:

 <blockquete>
 		npm init -y
 </blockquete>

 - Esse comando cria o arquivo package.json, que guarda informações do projeto.

 - Guarda rotina, definição se roda em produção ou em desenvolvimento, e lista de libs

# Instala o Express (servidor web)

 - Recebe a requisição e processa a resposta.
 - Usa o comando :

 <blockquete>
		npm install express --save
 </blockquete>

# Instala o puppeteer

 - Baixa o navegado, e roda em memoria.
 - Usa o comando:
 
 <blockquete>
		npm i puppeteer
 </blockquete>

# Copia o exemplo base do puppeteer

 - O codigo original de exemplo, apenas tira print do site indicado.

 <blockquete>

	const pupperteer = require('puppeteer');

	(async ()=>{

		const browser = await pupperteer.launch();
		const page = await browser.newPage();
		await page.goto('https://example.com');
		await page.screenshot({path: 'example.png'});

		await browser.close();
	})();

 </blockquete>

 - launch() / newPage(): acessa o navegador.
 - goto(): abre o site desejado.
 - screenshot(): tira print e cria a imagem.
 - close(): fecha o navegador.

# Declara o express

 - Faz a requisição do express, depois cria uma const com nome de server, para chamar o metodo express();

 <blockquete>

	const express = require('express');	
	const server = express();

 </blockquete>

 - Com isso define um endPont get('/'), quando alguem chamar "/".

 - request: executa uma função, recebe as informações de quem está pedindo.

 - response: da uma resposta.

 <blockquete>

	server.get('/', (request, response) =>{
		response.send('Ola mundo');
	});

 </blockquete>

 - Cria uma forma de acessar o servidor.

 - listen(): uma forma de escutar todas as requisições HTTP, define uma porta, para o navegador acessar.

 <blockquete>

		const port = 3000;
		server.listen(port, ()=>{
			console.log(`
				Servidor subiu com sucessinhos!
				acesse em http://localhost:${port}    
			`);
		});

 </blockquete>

 - Executa o programa, para exibir o retorno no navegador.
 
 <blockquete> node server.js </blockquete>

# Instala o nodemon

 - Permite rodar o servidor e atualiza caso tenha mudado algo, derrubando e subindo.

 - -dev: deixa como dependencia de desenvolvimento.

 - Usa o comando:
 
 <blockquete> 
  		npm i nodemon --save-dev 

 		npm install -g nodemon 
 </blockquete> 

 - Comando para rodar.
 
 <blockquete> nodemon ./server.js </blockquete>

 - OBS: caso de ruim na hora de rodar , executa no powerSheel o comando "Set-ExecutionPolicy RemoteSigned",
 para liberar as permições.

# Colocango a logica no metodo get.

 <blockquete>

        server.get('/', async (request, response) => {

            const browser = await pupperteer.launch();
            const page = await browser.newPage();
            
            await page.goto('https://www.alura.com.br/formacao-front-end');
            
            //Pegar dados da pagina da Alura.

            await browser.close();

            response.send({
                "id": 33082,
            });
        });

 </blockquete>

 - Torna o método Async.
 - Bota um objeto no send().
 - o navegador tem uma extenção chamado jsonview, que torna os json mais amigavel de se ver.

# Pegando informações da pagina e botando em uma objeto.

 - Usando o metodo evaluate().
 - Pegando as dimenções da pagina.

 <blockquete>
        const dimensions = await page.evaluate(() =>{
                return{
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight,
                    deviceScaleFactor: window.devicePixelRatio
                };
            });

        console.log('Demonsions:', dimensions);
 </blockquete>

 - Renomeia "dimensions" para "pageContent".
 - Cria outra propriedade chamada "subtitle".
 - Cria um codigo js, para pegar o conteudo baseada na classe.
 - 

 <blockquete>

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
		
		response.send({
			// "id": 33082,
			"subtitle": pageContent.subtitle,
			"title": pageContent.title,
		});

 </blockquete>

  - Tem que por a classe que existe no site.