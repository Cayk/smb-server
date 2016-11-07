var mongoose = require('../conexao/mongo');

var schema = mongoose.Schema;

var LocalizacaoSchema = schema({
    nome:{type:String, require:true},
    latitude:{type:Number, require:true},
    longitude:{type:Number, require:true},
    altitude:{type:Number, require:false}
});

LocalizacaoSchema.statics.buscar = function(retorno){
  this.find({})
  .exec(retorno);
};

module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
