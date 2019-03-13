const Scenario = (function(){
  function Scenario(description) {
    this.description = description;
    this.steps = {};
    this.context = {};
  }
  function findMatchStep(step) {
    for (const key of Object.keys(this.steps)) {
      if (this.steps[key].matcher.test(step)) {
        return this.steps[key];
      }
    }
    throw Error(`Cannot find step: ${step}`);
  }
  function createMatcher(phrase) {
    return new RegExp(phrase.replace(/{word}/g, "(\\w+)"), "i");
  }
  function createStep(step, def) {
    this.steps[step] = {
      def: def.bind(this.context),
      matcher: createMatcher.call(this, step)
    };
  }
  Scenario.prototype.given = function(step, def) {
    createStep.call(this, `Given ${step}`, def);
  }
  Scenario.prototype.when = function(step, def) {
    createStep.call(this, `When ${step}`, def);
  }
  Scenario.prototype.then = function(step, def) {
    createStep.call(this, `Then ${step}`, def);
  }
  Scenario.prototype.test = function(stepList) {
    console.log(`Scenario: ${this.description}`);
    for (const step of stepList) {
      const stepToRun = findMatchStep.call(this, step);
      console.log(`Step: ${step}`);
      const [first, ...args] = step.match(stepToRun.matcher);
      stepToRun.def(...args);
    }
  }
  return Scenario;
}());

const songTest = new Scenario('Check if song is being played.');

songTest.given('a title {word} and an artist {word}', function(title, artist) {
  this.title = title;
  this.artist = artist;
});
songTest.when('a user plays the song', function() {
  this.playing = `Playing: ${this.title} - ${this.artist}`;
});
songTest.then('the user hears the music', function() {
  if (this.playing.match(`${this.title} - ${this.artist}`)) {
    console.log('Song is playing.');
  } else {
    throw Error('Song is not playing!');
  }
});
const steps = [
  'Given a title Likey and an artist Twice',
  'When a user plays the song',
  'Then the user hears the music'
];
songTest.test(steps);
