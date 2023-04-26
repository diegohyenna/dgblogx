# DGBlogX

Um projeto para poder me aprofundar no angular, testes e devops.
Projeto gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 15.2.6.

## Tecnologias usadas

- Angular
- Boostrap
- Sass
- Jasmine
- GCloud
- Github Actions
- CI/CD
- Docker/Docker compose

## Servidor local

Com o CLI do angular

- Instale a cli do angular: `npm i -g @angular/cli`
- Rode na pasta raíz do projeto `npm install`
- Rode `ng serve` na pasta raíz do projeto e abra o navegador em `http://localhost:4200/`.

Com o Docker

- Instale o Docker e docker-compose, se tiver no windows, basta o docker desktop
- Rode o comando `npm run docker:dev` e abra o navegador em `http://localhost:4200/`.

## Rodando testes unitários

Testes locais

- `npm run test` roda o comando padrão
- `npm run test:coverage` roda o comando padrão e monta tbm a cobertura de testes, isso pode ser verificado abrindo o arquivo `coverage/dgblogx/index.html` no navegador

Testes no servidor

- `npm test:prod` comando que roda no github actions

## Deploy

Usando o GCloud.
Tudo foi configurado usando o Cloud Run vinculado ao repositorio no github desse projeto.
Usei Github Actions para fazer CI/CD, verifico o os testes uniários e formatação usando prettier.
Para realizar o deploy basta criar um novo branch e subir as alterações.
No Github, é preciso aprovar o pull request que só irá fazer o merge com master, se passar nos testes.
Uma vez no master, o Cloud Run monta o projeto de acordo com o container do docker composer, builda o projeto e atualiza o link do projeto [Aqui](https://dgblogx-2w3lnom44a-uc.a.run.app)
