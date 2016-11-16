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
  var nome = request.body.nome;
  var email = request.body.email;
  var senha = request.body.senha;

  if(!nome || !email || !senha)
    return response.sendStatus(400);

  pessoaSalvar = new Pessoa();
  pessoaSalvar.nome = nome;
  pessoaSalvar.senha = senha;
  pessoaSalvar.email = email;

  Pessoa.findOne({email: email}, function(erro, dados){
      if(erro){
        response.json({
          error: erro
        });
      }else if(dados != null){
        response.json({erro:"Email já cadastrada"});
      }else{
        pessoaSalvar.save(function(err){
          if(err)
            return response.sendStatus(500);

          response.json({ok:"ok"});
        });
      }
  });
});

router.post("/login", function(request, response){
  var email = request.body.email;
  var senha = request.body.senha;
  console.log(email);
  if(!email || !senha)
    return response.sendStatus(400);

  pessoaSalvar = new Pessoa();
  pessoaSalvar.senha = senha;
  pessoaSalvar.email = email;

  Pessoa.findOne({email: email, senha:senha}, function(erro, dados){
      if(erro){
        response.json({
          error: erro
        });
      }else{
          response.json(dados);
        }
      });
  });

router.put("/editar", function(request, response){
  var dados = request.body.pessoa;
  console.log(dados);
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
    pessoa.bicicleta = pessoaEditar.bicicleta;

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
