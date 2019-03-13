## Javascript: A few parts
Named after a number of popular Javascript-related articles, books, and courses, this repo contains a bunch of JS code that were used during a dev lecture at Kalibrr. This was named "A few parts" because it literally tackles only a few parts - parts that I am comfortable discussing. This was originally saved in my [codepen](https://codepen.io/collection/AVWaom/).

#### Topics
* Scope - Lexical scope, Function and Block scope, Hoisting, Closure, Arrow functions
* Objects - Prototypal Inheritance
* Types - Natives, Coercion

#### Exercise
Make a mock of CucumberJS where:
* Can define given, when, then steps (step name, and step definition)
* Can take a list of steps and execute the steps associated to it

Example:
```
const steps = [‘Given a number’,’When I add 2 to it’,’Then it is added by two’];
scenario.given(‘a number’, function() {
  this.number = 5;
});
scenario.when(‘I add 2 to it’, function() {
  this.numberAddedByTwo = this.number + 2;
});
scenario.then(‘it is added by two’, function() {
  console.log(this.numberAddedByTwo == this.number + 2);
});
scenario.test(steps);
```
