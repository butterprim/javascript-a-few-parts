// What's `this`?
// `this` is binded by default to the context of the call-site
var sound = 'Meow';

var dog = {
  bark: function() { // try changing this to an arrow function
    console.log(this.sound);
  },
  sound: 'Arf'
};

// If bark is a regular function and called 'within' the object
// `this` points that object (dog)
dog.bark();

// If bark is an arrow function, `this` inside bark will still point to the global scope (resulting to all logs becoming 'Meow')

// Assign the bark function to a variable in the global scope
var talk = dog.bark;
talk();

// Note: call-site is where it was called, not declared

// We can define a scope using explicit-binding
var context = { sound: 'Hahahahaha' };
var laugh = talk.bind(context);
laugh();
