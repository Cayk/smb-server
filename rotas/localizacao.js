var Localizacao = require('../modelo/localizacao');

var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');

var cliente = mqtt.connect('mqtt://localhost')

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

router.get("/enviar", function(request, response){
    cliente.publish("teste1", request.query.message);// Como o arduino irá publicar no servidor
    response.json({message: request.query.message});
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

cliente.on('connect', function(){
    cliente.subscribe('teste');
});

cliente.on('message', function (topic, message) {
  console.log(message.toString());
});
module.exports = router;
