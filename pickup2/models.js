let mongoose  = require('mongoose');
let Schema = mongoose.Schema;

//contact model
let PlayerSchema = new Schema({
    name: String,
    age: Number,
    position: String,
    skill: String,
});

let Player =  mongoose.model('Player', PlayerSchema)

let GameSchema = new Schema({
  players: {
    type: [],
    ref: "Player"
  },
  gameType: String,
  time: Date,
  host: {
    type: mongoose.Schema.ObjectId,
    ref: "Player"
  }
})

let Game = mongoose.model("Game", GameSchema);

let CourtSchema = new Schema({
  allGames: {
    type: [],
    ref: "Game"
  },
  location:

})

let Court = mongoose.model("Court", CourtSchema)

module.exports = {
  Player: Player,
  Game: Game,
  Court: Court
}
