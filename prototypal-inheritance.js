// Prototypal Inheritance

function fruitPrototypes() {
  // Let's create an object named fruit.
  let fruit = {
    sweet: 5,
    eat: function() {
      console.log('Munch!')
    },
  };

  // Now, we create a mango object, based on fruit.
  // Meaning, mango's prototype is fruit.
  let mango = Object.create(fruit);

  // Right now, mango doesn't have its own properties, only those that it 'inherited' from fruit.
  // (Not visible in codepen, but if printed on the console browser, you'll see that mango contains a __proto__ property that is the fruit object.)
  // If we access mango.sweet, sweet doesn't exist in mango's properties,
  // it will in turn, go down the prototype chain to see if its prototype has that property.
  // So if we do...
  console.log('Access sweet from mango', mango.sweet);
  // It will access the sweet property of fruit.
  // So if we do..
  fruit.sweet = 0;
  console.log('Check sweet in mango after assignment to fruit', mango.sweet);
  // The sweet that was accessed from mango, is actually fruit.sweet.

  // What happens if we assign a value to sweet on the mango object?
  mango.sweet = 8;
  // This will result to shadowing, where we essentially added a new sweet property to mango.
  // Note that this will not update fruit.sweet, as this is already mango's own sweet property.
  console.log('Check sweet in mango after shadowing', mango.sweet);
  console.log('Check sweet in fruit after shadowing', fruit.sweet);
  // So now, if we change fruit.sweet
  fruit.sweet = 10;
  console.log(`Check mango's sweet property, after assigning a value again to fruit.sweet`, mango.sweet);
  // mango is now unaffected of the changes made to its prototype, fruit.

  // If we add a new property to mango, that doesn't exist in its prototype...
  mango.peel = function() {
    console.log('*peeling*');
  };
  // The prototype, of couse is unchanged.
  console.log('fruit after assigning mango.peel', fruit);

  // Note that, there really is no inheritance. But only links or references to prototypes, which are also objects. It's a whole prototype chain. Or object chain. No properties are copied from the parent prototype to the child or the instance.
}

// Uncomment to see example on creating of object instances and diving into the prototype chain.
// fruitPrototypes();

// -----------------------------------------------------------

// Classes are functions! Or essentially... objects!
// Let's see how we do 'object-oriented' programming in javascript.

function objectOrientedUsingClass() {
  // class is new in es6 (constructor, super, static), but are actually just syntactic sugar.
  // So, don't be fooled! Consider,
  class Dog {
    constructor(name) {
      this.name = name || 'Taco';
    }

    greet() {
      return `Arf, I am ${this.name}.`;
    }
  }

  console.log('==================================');
  console.log(`Instantiating 'Classes'`);
  console.log('==================================');

  // When calling new before a class/object, it will make a constructor call.
  // And everytime a constructor call happens, `this` is binded to the newly created object.
  let taco = new Dog();
  // So when we created taco, taco now exists with its own name property. (Assigned during the constructor call)
  console.log('taco, created using new Dog', taco);

  // What if we create the instance using Object.create?
  // Okay, let's see.
  let pepper = Object.create(Dog);
  console.log('pepper, created using Object.create(Dog)', pepper);
  // The constructor of the class wasn't called, so name wasn't set.

  // Another difference between objects created with new and Object.create,
  // (Object.create(Dog)) pepper.prototype references the Dog object itself,
  // (new Dog) taco.prototype references to Dog.prototype

  // If we add a property to the Dog object...
  Dog.color = 'black';
  console.log('pepper.color, after assigning color to Dog', pepper.color);
  console.log('taco.color, after assigning color to Dog', taco.color);
  // Since pepper.prototype references the Dog object, pepper.color will get the value of Dog.color
  // More explanation in fruitPrototypes()

  // If we want to 'mimic' new's behavior with Object.create,
  // What we can do is link the instance to the parent's prototype, not the parent itself.
  let phoebe = Object.create(Dog.prototype);
  Dog.size = 'small';
  console.log('phoebe.size, after assigning size to Dog', phoebe.size);
  console.log('pepper.size, after assigning size to Dog', pepper.size);
  console.log('taco.size, after assigning size to Dog', taco.size);

  // What about the constructor call? Unfortunately, for objects declared with class, that would only be called during new. If you do, Dog.call(phoebe, 'Phoebe'), it will throw an error that class constructors cannot be invoked without the new keyword.
   try {
     Dog.call(phoebe, 'Phoebe');
   } catch(e) {
     console.log('After trying to manually call the Dog constructor for phoebe', e.message);
   }
  // So, when instantiating objects declared with class, use `new`!

  // Another question! If changes to the Dog object, will not affect instances of it (taco),
  // what if we make changes to Dog.prototype?
  Dog.prototype.isCute = true;
  console.log('taco.isCute, After assigning a new property isCute in Dog.prototype', taco.isCute);
  // taco 'inherits' this new property! Because again, taco has links to Dog.prototype
  console.log('taco.__proto__ == Dog.prototype', taco.__proto__ == Dog.prototype);
  // __proto__ property accesses the object's prototype chain


  console.log('==================================');
  console.log(`Extending 'Classes'`);
  console.log('==================================');

  class Yorkie extends Dog {
    greet() {
      return `Grrr, I am ${this.name}.`;
    }
  }
  // When a class extends from another, the new class's prototype, directly references the parent object.
  Dog.age = 1;
  console.log('Yorkie.age, After assigning age to Dog', Yorkie.age);
  // Calling Yorkie.age will result to the engine to go down Yorkie's prototype chain,
  // and end up accessing its prototype, the Dog object, that has an age property.
  // This is similar to what happens during the examples in fruitPrototypes();
  console.log('Dog is a prototype of Yorkie', Dog.isPrototypeOf(Yorkie));
  console.log('Dog is a prototype of taco', Dog.isPrototypeOf(taco));
  console.log('Dog.prototype is a prototype of taco', Dog.prototype.isPrototypeOf(taco));

  // <parent>.isPrototypeOf(<child>) will check if parent ever shows up in child's prototype chain.
  // Let's create an instance of Yorkie, and check if it has Dog.prototype in its prototype chain:
  let nacho = new Yorkie('Nacho');
  console.log('Dog.prototype is a prototype of nacho', Dog.prototype.isPrototypeOf(nacho));
  console.log('Yorkie.prototype is a prototype of nacho', Yorkie.prototype.isPrototypeOf(nacho));
}

// Uncomment if we want to see the object-oriented approach using the `class` keyword
// objectOrientedUsingClass();

function objectOrientedUsingFunctions() {
  // The part where () is after the function, makes the function an IIFE or an immediately invoked function expression. As the name suggests, the function is executed immediately after it has been compiled by the engine.
  // IIFEs are useful if you want to enclose variables within that scope. So if I want to make a cat object, without letting the world know about some of the variables and functions I use, such as 'defaultName', enclosing it inside an IIFE would do the job.
  let Cat = (function() {
    let defaultName = 'Luna';

    function Cat(name) {
      this.name = name || defaultName;
    }
    Cat.prototype.greet = function() {
      return `Meow, I am ${this.name}.`;
    }
    return Cat;
  }());

  // Examining this code, Cat is just a function, or just an object - where a greet function has been added to its prototype.
  // Like in objectOrientedUsingClass, we saw how `new` and Object.create differ from one another.
  // This is the same for Cat. When an object is created using `new`, the constructor call is invoked, which assigns the name in `this`.
  // The difference is, we can invoke Cat without the `new` keyword, resulting to the assignment of the variables "name" with either the parameter's value or the default 'Luna'.
  // To demonstrate, what if we call...
  Cat('Lizette');
  // Cat function is invoked inside objectOrientedUsingFunctions,
  // and objectOrientedUsingFunctions is invoked inside the global scope. Making `this` inside Cat, refer to the global context. Resulting to accidentally assigning a value to the variable 'name ' in our global scope.

  // Back to our topic! Object-oriented in javascript.
  // Let's instantiate Cat.
  let luna = new Cat();
  // Similar to classes, luna's prototype points to the Cat.prototype. So when assigning a new property to the Cat object itself,
  Cat.color = 'orange';
  console.log('luna.color, after assigning color to Cat', luna.color);
  // But when adding new things to Cat.prototype..
  Cat.prototype.size = 'small';
  console.log('luna.size, after assigning size to Cat.prototype', luna.size);

  // If we created our 'Classes' without using the class keyword, and our function-based classes can be invoked without the `new` keyword, we can now use Object.create to instantiate objects!
  let kitty = Object.create(Cat.prototype);
  Cat.call(kitty, 'Perry');
  console.log(`kitty created using Object.create`, kitty);
  console.log(`luna created using new`, luna);

  // Extending 'classes'
  function Siamese(name) {
    Cat.call(this, name);
  }
  Siamese.prototype = Object.create(Cat.prototype);
}

console.log(`Before calling Cat('Lizette') in objectOrientedUsingFunctions`, name);
objectOrientedUsingFunctions();
console.log(`After calling Cat('Lizette') in objectOrientedUsingFunctions`, name);

function copyingClasses() {
  // Copying classes
  const jake = luna; // not copying, but passing a reference of luna to jake
  // const jake = Object.assign({}, luna); // copy properties of luna to empty object
  // const jake = Object.create(luna); // this will create a child prototype
  // const jake = JSON.parse(JSON.stringify(luna));
  // jake.name = 'Jake';
  // console.log(jake.name, luna.name);
  // console.log(luna.isPrototypeOf(jake)); // check if 'child'
}

// Uncomment to see examples of copying objects.
// copyingClasses();

