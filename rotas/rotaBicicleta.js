var Bicicleta = require('../modelo/bicicleta');
var Pessoa = require('../modelo/pessoa');

var express = require('express');
var router = express.Router();

router.get("/", function(request, response){

    Bicicleta.buscar(
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

router.post("/cadastrar", function(request, response){

  var dadosBicicleta = request.body.bicicleta;

  if(!dadosBicicleta)
    return response.sendStatus(400);

  var jsonBicicleta = JSON.parse(dadosBicicleta);

  bicicletaSalvar = new Bicicleta(jsonBicicleta);

  Bicicleta.buscarBikeIdentificador(bicicletaSalvar.identificador, function(erro, dados){

    if(erro){
      console.log("Error dados");
      response.json({
        error: erro
      });
    }else if(dados != null){
      console.log("Bicicleta já cadastrada");
      response.json({erro:"bicicleta já cadastrada"});
    }else{
      bicicletaSalvar.save(function(err){
        if(err)
          return response.sendStatus(500);

        response.json({ok:"ok"});
      });
    }
  });
});

router.post("/app-cadastrar", function(request, response){

  var dadosBicicleta = request.body.bicicleta;
  var dadosPessoa = request.body.pessoa;

  if(!dadosBicicleta || !dadosPessoa)
    return response.sendStatus(400);

  var jsonBicicleta = JSON.parse(dadosBicicleta);
  var jsonPessoa = JSON.parse(dadosPessoa);

  bicicletaSalvar = new Bicicleta(jsonBicicleta);
  pessoaEditar = new Pessoa(jsonPessoa);

  Pessoa.findOne({_id:pessoaEditar._id}, function(err, pessoa){
    if(err)
      return response.sendStatus(500);

    Bicicleta.buscarBikeIdentificador(bicicletaSalvar.identificador, function(erro, dados){
      if(erro){
        response.json({
          error: erro
        });
      }else if(dados != null){

        pessoa.bicicleta = bicicletaSalvar.identificador;
        pessoa.save(function(err){
          if(err)
            return response.sendStatus(500);

          response.json({ok:"ok"});
        });
      }else{
        bicicletaSalvar.save(function(err){
          if(err)
            return response.sendStatus(500);

            pessoa.bicicleta = bicicletaSalvar.identificador;
            pessoa.save(function(err){
              if(err)
                return response.sendStatus(500);

              response.json({ok:"ok"});
            });
        });
      }
    });
  });
});

router.post("/cadastrar-viagem", function(request, response){

  var identificador = request.body.identificador;
  var dadosViagem = request.body.viagem;

  var jsonViagem = JSON.parse(dadosViagem);
  console.log(identificador);
  console.log(dadosViagem);
  Bicicleta.update({identificador:identificador}, {$push : {listaViagens: jsonViagem }}, function(err){
    if(err)
      return response.sendStatus(500);
    response.json({ok:"ok"});
  });
});

router.post("/cadastrar-loc", function(request, response){

  var _idViagem = request.body._idViagem;
  var dadosLoc = request.body.loc;

  var jsonLoc = JSON.parse(dadosLoc);

  Bicicleta.update({"listaViagens._id": _idViagem}, {$push : {"listaViagens.$.listaLoc": {$each : [jsonLoc]} }}, function(err){
    if(err){
      return response.send(err);
    }
    response.json({ok:"ok"});
  });
});

module.exports = router;
