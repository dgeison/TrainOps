// server.js
// Responsável por configurar e iniciar a aplicação Express, motor de views (Nunjucks),
// middlewares globais e registro das rotas.
// Observação: Persistência atual via arquivo JSON (data.json) - adequada para estudo/protótipo,
// não recomendada para produção devido a condições de corrida e ausência de bloqueio.

const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const methodOverride = require('method-override')
const server = express();


// middlewares
server.use(express.urlencoded({ extended: true })); // Faz o parse de bodies de formulários (application/x-www-form-urlencoded)
server.use(express.static("public")); // Servir arquivos estáticos (CSS, JS, imagens)
server.use(methodOverride('_method')) // Permite usar ?_method=PUT / DELETE em formulários HTML
server.use(routes); // Registra as rotas definidas em routes.js

server.set("view engine", "njk");

// Configuração do Nunjucks.
// Atenção: autoescape está desabilitado (false) por simplicidade do estudo.
// Em produção, defina autoescape: true e escape manual apenas onde necessário.
// Alterado para autoescape: true para mitigar XSS.
nunjucks.configure("views", {
  express: server,
  autoescape: true,
  noCache: true,
});

// Inicializa o servidor HTTP.
server.listen(5000, function () {
  console.log("Server is running on http://localhost:5000");
});
