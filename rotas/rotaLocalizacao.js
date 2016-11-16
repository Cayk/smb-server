var Localizacao = require('../modelo/localizacao');
var Bicicleta = require('../modelo/bicicleta');

var express = require('express');
var router = express.Router();

router.get("/", function(request, response){

    Localizacao.buscar(
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

router.post("/bike", function(request, response){

  var identificador = request.body.identificador;
  console.log(identificador);
  if(!identificador)
    return response.sendStatus(400);

  Localizacao.buscarPorBicicleta(identificador, function(erro, dados){

    if(erro){
      console.log("Error dados");
      response.json({
        error: erro
      });
    }else {
      console.log("Ok");
      response.json(dados);
    }
  });
});

router.post("/", function(request, response){
  var loc = request.body.localizacao;
  console.log(loc);
  if(!loc)
    return response.sendStatus(400);

    var json = JSON.parse(loc);

    localiza = new Localizacao(json);
    Bicicleta.buscarBikeIdentificador(localiza.bicicleta, function(erro, bicicleta){
      if(erro){
        response.json({error: erro});
      }
      if(bicicleta != null){
        Localizacao.buscarPorBicicleta(localiza.bicicleta, function(erro, dados){
          if(erro){
            response.json({error: erro});
          }
          if(dados == null){
            localiza.save(function(err){
              if(err)
                return response.sendStatus(500);
            })
          }
          else{
              dados.latitude = localiza.latitude;
              dados.longitude = localiza.longitude;

              dados.save(function(err){
                if(err)
                  return response.sendStatus(500);
              });
          }
          response.json(dados);
        });
      }
    });
});

module.exports = router;
