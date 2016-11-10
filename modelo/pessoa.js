var mongoose = require('../conexao/mongo');

var schema = mongoose.Schema;
var bicicleta = schema.objectId;
var PessoaSchema = schema({
  nome:{type:String, require:true},
  senha:{type:String, require:true},
  email:{type:String, require:true},
  bicicleta_id: bicicleta;
});

PessoaSchema.statics.buscar = function(retorno){
  this.find()
  .exec(retorno);
};

module.exports = mongoose.model('Pessoa', PessoaSchema);
