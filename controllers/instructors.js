// controllers/instructors.js
// Lida com o ciclo de vida (CRUD) de instrutores.
// Observação: Persistência baseada em arquivo JSON simples.
// Pontos de melhoria futura: validação robusta, extração para camada de modelo, tratamento de erros estruturado.

const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

exports.index = function (req, res) {
  return res.render("instructors/index", { instructors: data.instructors });
};

exports.create = function(req, res){
  return res.render("instructors/create")
}

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  // Validação simples de campos obrigatórios (melhorar futuramente)
  for (const key of keys) {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  }

  let { avatar_URL, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();

  // Geração de ID ingênua: length + 1 pode gerar duplicados após deleção.
  // Alternativa recomendada: pegar último elemento ordenado ou usar UUID.
  const last = data.instructors[data.instructors.length - 1];
  const id = last ? last.id + 1 : 1;

  data.instructors.push({
    id,
    avatar_URL,
    name,
    birth,
    gender,
    services: services.split(",").map(s => s.trim()).join(", "), // Normaliza espaçamentos
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file errors!");
    return res.redirect(`/instructors/${id}`);
  });
};

exports.show = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return id == instructor.id;
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundInstructor.created_at
    ),
  };

  return res.render("instructors/show", { instructor });
};

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return id == instructor.id;
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso,
  };

  return res.render("instructors/edit", { instructor });
};

exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
    if (Number(id) === instructor.id) {
      index = foundIndex;
      return true;
    }
    return false;
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
    services: req.body.services.split(",").map(s => s.trim()).join(", ")
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error!");
    return res.redirect(`/instructors/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;
  const filteredInstructors = data.instructors.filter(function (instructor) {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error!");

    return res.redirect(`/instructors`);
  });
};

// DICAS
// req.query.id => PELA ?
// req.body => PEGA DO FORM
// req.params.id = /:id = PEGA PELA URL
