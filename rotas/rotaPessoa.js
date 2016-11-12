var Pessoa = require('../modelo/pessoa');

var express = require('express');
var router = express.Router();

router.get("/", function(request, response){

    Pessoa.buscar(
      function(erro, dados){

        if(erro){
          console.log("Error dados");
          response.json({
            error: erro
          });
        }else {
          console.log("Ok");
          response.json(dados);
        }
      }
    );
});

router.get("/buscar/:id", function(request, response){

  var idPessoa = request.params.id;

  Pessoa.buscarPorId(idPessoa, function(erro, dados){
      if(erro){
        console.log("Error dados");
        response.json({
          error: erro
        });
      }else {
        console.log("Ok");
        response.json(dados);
      }
    }
  );
});

router.post("/cadastrar", function(request, response){
  var pessoa = request.body.pessoa;

  if(!pessoa)
    return response.sendStatus(400);

  var json = JSON.parse(pessoa);

  pessoaSalvar = new Pessoa(json);

  pessoaSalvar.save(function(err){
    if(err)
      return response.sendStatus(500);

    response.json({ok:"ok"});
  });
});

router.put("/editar", function(request, response){
  var dados = request.body.pessoa;

  if(!dados)
    return response.sendStatus(400);

  var json = JSON.parse(dados);

  pessoaEditar = new Pessoa(json);

  Pessoa.findOne({_id:pessoaEditar._id}, function(err, pessoa){
    if(err)
      return response.sendStatus(500);

    pessoa.nome = pessoaEditar.nome;
    pessoa.email = pessoaEditar.email;
    pessoa.senha = pessoaEditar.senha;

    pessoa.save(function(err){
      if(err)
        return response.sendStatus(500);

      response.json({ok:"ok"});
    });
  });
});

router.delete("/excluir", function(request, response){
  var dados = request.body.pessoa;

  if(!dados)
    return response.sendStatus(400);

  var json = JSON.parse(dados);

  pessoaExcluir = new Pessoa(json);

  Pessoa.remove({_id:pessoaExcluir._id}, function(err){
    if(err)
      return response.sendStatus(500);

    response.json({ok:"ok"});
  });
});
module.exports = router;
