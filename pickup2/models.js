let mongoose  = require('mongoose');
let Schema = mongoose.Schema;

//contact model
let PlayerSchema = new Schema({
    username: String,
    password: String,
    name: String,
    age: String,
    position: String,
    skill: String,
    imgUrl: {
      type: String,
      default: "https://horizons-static.s3.amazonaws.com/horizons_h.png"
    }
});

let Player =  mongoose.model('Player', PlayerSchema)

let GameSchema = new Schema({
  players: Array,
  gameType: String,
  time: Date,
  host: String,
  skillLevel: String
})

let Game = mongoose.model("Game", GameSchema);

let CourtSchema = new Schema({
  allGames: {
    type: [],
    ref: "Game"
  },
  location: {
    latitude: Number,
    longitude: Number
  }

})

let Court = mongoose.model("Court", CourtSchema)

module.exports = {
  Player: Player,
  Game: Game,
  Court: Court
}
