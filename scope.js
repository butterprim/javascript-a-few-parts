// Terms: Lexical scope, Function scope, Block scope

const valOfTwo = 2;

function multiplyByTwo(num) {
  return num * valOfTwo; // I defined valOfTwo in the global scope and I expect it to be 2.
}

function multiplyByFour(num) {
  return num * valOfFour; // Where is valOfFour???? There's no valOfFour before this line!!
}

const numTimesTwo = multiplyByTwo(4);
// console.log("four times two", numTimesTwo);

var valOfFour = 4; // It's here! This will be hoisted to the top,
                   // making it available for reference in function multiplyByFour.
const numTimesFour = multiplyByFour(10);
// console.log("ten times four", numTimesFour);


// Closures
function createMultiplyBy(mult) {
  return function(val) {
    return mult * val;
  }
}
const multiplyByFive = createMultiplyBy(5);
const multiplyByEight = createMultiplyBy(8);
// console.log(multiplyByFive(4));
// console.log(multiplyByEight(4));


// Only variables defined with var are added to the global `window` object
const shape = 'circle';
function drawSomething() {
  console.log(this.shape); // this == window
}
// drawSomething(); // undefined


// Using const/let inside for loops, creates a fresh new binding to the variable
function writeSomethingEverySecond() {
  for(let i of [1, 2, 3]) { // try to run with `let i` and `var i` to see difference
    setTimeout(function() {
      console.log(i);
    }, i);
  }
}
// But what about garbage collection? Isn't creating a variable at every loop expensive?
// Nope. Variables in an unreachable code, are freed in memory.
// Making the declared i in every iteration cleared after the block has been executed.

// writeSomethingEverySecond();

function hoisting() {
  a = 2;

  var a;

  console.log(a);
}

function hoisting2() {
  console.log(a);

  var a = 2;
}

// hoisting();
// hoisting2();
// Note: hoisting is per scope!