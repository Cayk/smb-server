var Localizacao = require('../modelo/localizacao');
var Bicicleta = require('../modelo/bicicleta');

var express = require('express');
var router = express.Router();

router.get('/:valor', function(request, response) {
  var string = request.params.valor;

  var resultado = string.split(":");
  var identificador = resultado[0];
  var lat = resultado[1];
  var lon = resultado[2];

  console.log(identificador);
  console.log(lat);
  console.log(lon);

  loc = new Localizacao();
  loc.latitude = lat;
  loc.longitude = lon;
  loc.bicicleta = identificador;

  console.log(loc);

  Bicicleta.buscarBikeIdentificador(identificador, function(erro, bicicleta){
    if(erro){
      response.json({error: erro});
    }
    if(bicicleta != null){
      Localizacao.buscarPorBicicleta(identificador, function(erro, dados){
        if(erro){
          response.json({error: erro});
        }
        if(dados == null){
          loc.save(function(err){
            if(err)
              return response.sendStatus(500);
          })
        }
        else{
            dados.latitude = loc.latitude;
            dados.longitude = loc.longitude;

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

/*router.post("/", function(request, response){
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
});*/

module.exports = router;
