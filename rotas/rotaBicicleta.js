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

/**
 * @api {post} /viagens
 * @apiGroup Bicicleta

 * @apiParam {String} identificador   Obrigatório
 *
 * @apiSuccess {Viagem[]} Retorna a lista de viagens da bicicleta que possui o identificador informado.
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "listaViagens": [{"_id": "58268d952df6e64ade48d529", "nome": "Viagem 1",
 *          "listaLoc": [{"_id": "58268d952df6e64ade48d52a", "longitude": 45352, "latitude": 12345},
 *                       {"_id": "58269027f3c7df4d364eea7b", "longitude": 45382, "latitude": 12365}]}]
 *    }
 *
 * @apiError Erro Erros.

 * @apiError Erro Bad Request.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400
 *     }
 *
 * @apiError Erro Bad Request.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 Error
 *     {
 *       error: erro
 *     }
 *
 * @apiError Erro Bicicleta já cadastrada.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 Error
 *     {
 *       error: erro
 *     }
 */
router.post("/viagens", function(request, response){

  var identificador = request.body.identificador;

  if(!identificador)
    return response.sendStatus(400);

  Bicicleta.buscarBikeIdentificador(identificador, function(erro, dados){
      if(erro){
        response.json({error: erro});
      }else {
        response.json(dados);
      }
  });
});


/**
 * @api {post} /cadastrar
 * @apiGroup Bicicleta

 * @apiParam {Bicicleta} bicicleta   Obrigatório
 *
 * @apiSuccess {String} ok viagem salva com sucesso.
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      ok: "ok"
 *    }
 *
 * @apiError Erro Erros.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       status: 500
 *     }

 * @apiError Erro Bad Request.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400
 *     }
 *
 * @apiError Erro Bad Request.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 Error
 *     {
 *       error: erro
 *     }
 *
 * @apiError Erro Bicicleta já cadastrada.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 Error
 *     {
 *       erro: "Bicicleta já cadastrada"
 *     }
 */
router.post("/cadastrar", function(request, response){

  var dadosBicicleta = request.body.bicicleta;

  if(!dadosBicicleta)
    return response.sendStatus(400);

  var jsonBicicleta = JSON.parse(dadosBicicleta);

  bicicletaSalvar = new Bicicleta(jsonBicicleta);

  Bicicleta.buscarBikeIdentificador(bicicletaSalvar.identificador, function(erro, dados){

    if(erro){
      response.json({error: erro});
    }else if(dados != null){
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

/**
 * @api {post} /app-cadastrar
 * @apiGroup Bicicleta

 * @apiParam {Bicicleta} bicicleta   Obrigatório
 * @apiParam {Pessoa} pessoa         Obrigatório
 *
 * @apiSuccess {Pessoa} pessoa viagem salva com sucesso.
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      pessoa:{"_id": "5828a0647efa152e5cf532d9", "email": "pessoa@email.com", "senha": "1234", "nome": "Pessoa"}
 *    }
 *
 * @apiError Erro Erros.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       status: 500
 *     }

 * @apiError Erro Bad Request.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400
 *     }
 *
 * @apiError Erro Bad Request.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 Error
 *     {
 *       error: erro
 *     }
 */
router.post("/app-cadastrar", function(request, response){

  var dadosBicicleta = request.body.bicicleta;
  var dadosPessoa = request.body.pessoa;

  if(!dadosBicicleta || !dadosPessoa)
    return response.sendStatus(400);

  bicicletaSalvar = new Bicicleta();

  Pessoa.findOne({_id:dadosPessoa}, function(err, pessoa){
    if(err)
      return response.sendStatus(500);

    Bicicleta.buscarBikeIdentificador(dadosBicicleta, function(erro, dados){
      if(erro){
        response.json({error: erro});
      }else if(dados != null){

        pessoa.bicicleta = dadosBicicleta;
        pessoa.save(function(err){
          if(err)
            return response.sendStatus(500);

          response.json(pessoa);
        });
      }else{
        bicicletaSalvar.identificador = dadosBicicleta;
        bicicletaSalvar.save(function(err){
          if(err)
            return response.sendStatus(500);

            pessoa.bicicleta = bicicletaSalvar.identificador;
            pessoa.save(function(err){
              if(err)
                return response.sendStatus(500);

              response.json(pessoa);
            });
        });
      }
    });
  });
});

/**
 * @api {post} /cadastrar-viagem"
 * @apiGroup Bicicleta

 * @apiParam {String} identificador   Obrigatório
 * @apiParam {Viagem} viagem   Obrigatório
 *
 * @apiSuccess {String} ok viagem salva com sucesso.
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      ok:"ok"
 *    }
 *
 * @apiError Erro Erros.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       status: 500
 *     }

 * @apiError Erro Bad Request.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400
 *     }
 */
router.post("/cadastrar-viagem", function(request, response){

  var identificador = request.body.identificador;
  var dadosViagem = request.body.viagem;

  if(identificador == null || dadosViagem == null)
    response.sendStatus(400);

  var jsonViagem = JSON.parse(dadosViagem);

  Bicicleta.update({identificador:identificador}, {$push : {listaViagens: jsonViagem }}, function(err){
    if(err)
      return response.sendStatus(500);
    response.json({ok:"ok"});
  });
});

/**
 * @api {post} /cadastrar-loc
 * @apiGroup Bicicleta

 * @apiParam {String} idViagem   Obrigatório
 * @apiParam {Localizacao} loc   Obrigatório
 *
 * @apiSuccess {String} ok viagem salva com sucesso.
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      ok:"ok"
 *    }
 *
 * @apiError Erro Erros.
 *
 * @apiError Erro Bad Request.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400
 *     }
 *
 * @apiError Erro erro.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1
 *     {
 *       error: erro
 *     }
 */
router.post("/cadastrar-loc", function(request, response){

  var _idViagem = request.body._idViagem;
  var dadosLoc = request.body.loc;

  if(_idViagem == null || dadosLoc == null)
    return response.sendStatus(400);

  var jsonLoc = JSON.parse(dadosLoc);

  Bicicleta.update({"listaViagens._id": _idViagem}, {$push : {"listaViagens.$.listaLoc": {$each : [jsonLoc]} }}, function(err){
    if(err){
      return response.send(err);
    }
    response.json({ok:"ok"});
  });
});

module.exports = router;
