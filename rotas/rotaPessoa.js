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

module.exports = router;
