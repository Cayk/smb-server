var mongoose = require('../conexao/mongo');

var schema = mongoose.Schema;

var PessoaSchema = schema({
  nome:{type:String, require:true},
  senha:{type:String, require:true},
  email:{type:String, require:true},
  bicicleta:{type:String, require:false}
}, {versionKey: false});

PessoaSchema.statics.buscar = function(retorno){
  this.find()
  .exec(retorno);
};

PessoaSchema.statics.buscarPorId = function(idPessoa, resposta){
  this.findOne({_id:idPessoa})
  .exec(resposta);
}

module.exports = mongoose.model('Pessoa', PessoaSchema);
