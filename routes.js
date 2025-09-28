// routes.js
// Define as rotas HTTP da aplicação, delegando lógica de negócio aos controllers.
// Organização: CRUD para Instructors e Members.
// Melhorias futuras possíveis: agrupar em arquivos separados por recurso ou usar Router modular.

const express = require("express");
const routes = express.Router();
const instructors = require("./controllers/instructors");
const members = require("./controllers/members");

// Redireciona a raiz para listagem de instrutores (página principal atual)
routes.get("/", function (req, res) {
  return res.redirect("/instructors");
});
// Instructors CRUD
routes.get("/instructors", instructors.index);      // Listagem
routes.get("/instructors/create", instructors.create); // Form de criação
routes.get("/instructors/:id", instructors.show);      // Detalhe
routes.get("/instructors/:id/edit", instructors.edit); // Form de edição
routes.post("/instructors", instructors.post);         // Criação
routes.put("/instructors", instructors.put);           // Atualização
routes.delete("/instructors", instructors.delete);     // Exclusão


// Members CRUD
routes.get("/members", members.index);
routes.get("/members/create", members.create);
routes.get("/members/:id", members.show);
routes.get("/members/:id/edit", members.edit);
routes.post("/members", members.post);
routes.put("/members", members.put);
routes.delete("/members", members.delete);

module.exports = routes;
