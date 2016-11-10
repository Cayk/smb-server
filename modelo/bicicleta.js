var mongoose = require('../conexao/mongo');

var schema = mongoose.Schema;

var BicicletaSchema = schema({
    identificador:{type:String, require:true},
    listaViagem:[{
      _id:schema.objectId,
      nome:{type:String, require:true},
      listaLoc:[{
        latitude:{type:Number, require:true},
        longitude:{type:Number, require:true},
        time:{type:Number, require:false}
      }]
    }]
});

BicicletaSchema.statics.buscarViagens = function(idBicicleta, resposta){
  this.find({identificador:idBicicleta})
  .exec(retorno);
};

BicicletaSchema.statics.buscarViagem = function(idViagem, resposta){
  this.find({_id:idViagem})
  .exec(retorno);
};

module.exports = mongoose.model('Bicicleta', BicicletaSchema);
