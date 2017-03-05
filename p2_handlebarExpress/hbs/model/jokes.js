var jokes = [
  "A day without sunshine is like, night.",
  "At what age is it appropriate to tell my dog that he's adopted?",
  "I intend to live forever, or die trying"
];

module.exports = {
  allJokes : jokes,
  getRandomJoke : _getRandomJoke,
  addJoke : _addJoke
}

function _getRandomJoke(){
  var size = jokes.length;
  var rndJoke = {};
  var rnd = Math.floor((Math.random() * size));
  rndJoke = {joke: jokes[rnd]};
  return rndJoke;
}

function _addJoke(joke){
  jokes.push(joke);
}

// console.log(_getRandomJoke())
