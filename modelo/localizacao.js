var mongoose = require('../conexao/mongo');

var schema = mongoose.Schema;

var LocalizacaoSchema = schema({
  latitude:{type:Number, require:true},
  longitude:{type:Number, require:true},
  bicicleta:{type:String, require:true}
}, {versionKey: false});

LocalizacaoSchema.statics.buscar = function(retorno){
  this.find({})
  .exec(retorno);
};

LocalizacaoSchema.statics.buscarPorBicicleta = function(bicicleta, resposta){
  this.findOne({bicicleta:bicicleta})
  .exec(resposta);
}
module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
