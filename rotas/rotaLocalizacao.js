var Localizacao = require('../modelo/localizacao');

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

router.post("/", function(request, response){
  var loc = request.body.localizacao;

  if(!loc)
    return response.sendStatus(400);

    var json = JSON.parse(loc);

    localiza = new Localizacao(json);

    localiza.save(function(err){
      if(err)
        return response.sendStatus(500);

      response.json({ok:"ok"});
    });
});

module.exports = router;
