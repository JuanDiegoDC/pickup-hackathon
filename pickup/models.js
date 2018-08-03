var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

//contact model
var PlayerSchema = new Schema({
    name: String,
    age: Number,
    position: String,
    skill: String,
});

var PlayerSchema =  mongoose.model('Player', PlayerSchema)

module.exports = {
  Player: PlayerSchema
}
