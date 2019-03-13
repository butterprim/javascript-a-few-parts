// Natives

function native() {
  // taco is of type string
  const taco = 'Taco';
  console.log('Type of taco', typeof taco);

  const nacho = new String('Nacho');
  console.log('Type of nacho', typeof nacho);

  // If taco is a string, and nacho is an object...
  console.log(taco.split(''));
  // Why am I able to call a split function from taco?
  // Answer: primitive values are being virtually wrapped with an object
}

// Uncomment to see examples on native objects.
// native();

// ----------------------------------------------
// Coercion

function coercion() {
  // Loose equality specs (informal definition): with x == y,
  // If x is a number and y is either a string or a boolean, x == Number(y)
  // If x is a number and y is an object, x == y.valueOf() (or y.toString())
  // If x and y is the same type, x === y

  console.log('[] == ![]', [] == ![]);
  // Explanation: ![] is coerced into a boolean because of the `!`
  // Resulting to this expression: '' == false

  console.log('42 == [42]', 42 == [42]);
  // Explanation: [42] will be converted to its primitive value, and then to a number.
  // 42 == '42'
  // 42 == 42

  console.log('42 == [43]', 42 == [43]);
  // Explanation: Same as above.

  console.log(`32 + 'b'`, 32 + 'b');
  // Explanation: String concatenation happens when atleast one addend is a string.

  console.log(`'b' + 'a' + +'a' + 'a'`, 'b' + 'a' + +'a' + 'a');
  // Explanation: When a variable has '+' directly before it, it is coerced into a number.
  // This will result to 'b' + 'a' + NaN + 'a'

  console.log(`1 - '42'`, 1 - 'b');
  // Explanation: Concatenation only happens during the '+' operation.
  // This will convert all values to numbers before performing to operation.

  const myObject = {
    toString: function() {
      return 'hacked!';
    }
  };
  console.log(`32 + myObject`, 32 + myObject);
  // Explanation: When adding objects, it will first get the primitive value of the object.

  console.log(`'hacked!' == myObject`, 'hacked!' == myObject);
  // Explanation: When converting myObject to its primitive value, our defined toString function was called.

  const referenceToObject = myObject;
  console.log('referenceToObject == myObject', referenceToObject == myObject);
  // Explanation: When comparing objects, references are compared.

  const copyOfObject = Object.assign({}, myObject);
  console.log('copyOfObject == myObject', copyOfObject == myObject);
  // Explanation: copyOfObject and myObject are separate references.

  console.log(`[0] == ''`, [0] == '');
  // Explanation: The [0] will be converted to its primitive value, resulting to '0'.
  // Resulting to '0' == '', where we now have similar types. (See comparison specs)

  console.log(`new String('test') vs 'test'`, new String('test') == 'test');
  // Explanation: The String object will return 'test'. Resulting to 'test' == 'test'

  console.log('null == false', null == false);
  // Explanation: The specs define null as incomparable to any value except undefined.

  console.log('null == true', null == true);
  // Explanation: The specs define null as incomparable to any value except undefined.
}

// Uncomment to see examples on Coercion.
// coercion();

// ----------------------------------------------
// Falsy values
// Falsy is not just false

function isFalsy(val) {
  if (!val) {
    console.log(`${val} is falsy`);
  } else {
    console.log(`${val} is truthy`);
  }
}

function isNull(val, isLoose) {
  if (isLoose == undefined) isLoose = true;
  const condition = isLoose ? val == null : val === null;
  if (condition) {
    console.log(`${val} is null`);
  } else {
    console.log(`${val} is not null`);
  }
}

let foo;
// isNull(foo, false);

// Common errors with falsy:
// 1. Checking if an object has a property x
foo = {
  'name': null,
  'age': 24
}
function wrongCheckOfProperty() {
  if (foo.name) {
    console.log('Has name property');
  } else {
    console.log(`Doesn't have name property`);
  }
}

function rightCheckOfProperty() {
  if (foo.hasOwnProperty('name')) { // alternatively, 'name' in foo
    console.log('Has name property');
  } else {
    console.log(`Doesn't have name property`);
  }
}

// Real-world example:
// An object form contains the values submitted by the user.
// An certain input name is optional, having null as its value.
// I want to validate the values per type, but would like to use handlers for validation.
// Demo:
// { 'name': null, 'age': 24 }
// validateString() { when not empty, check if contains numbers }
// validateNumber() { check if over 18 }
// if (form.name) { validateString(form.name) }

// 2. Checking if a variable exists but its value is 0
foo.age = 0;

function wrongCheckIfZeroExists() {
  if (foo.age) {
    console.log('Has age value');
  } else {
    console.log('Missing age value');
  }
}

function rightCheckIfZeroExists() {
  if (foo.age != null) {
    console.log('Has age value');
  } else {
    console.log('Missing age value');
  }
}

// Real world example:
// I have an object quiz, with property points.
// I want to check if I have assigned a value to quiz.points, if not, I will run quiz.check()

