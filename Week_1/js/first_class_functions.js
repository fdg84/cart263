"use strict"

// // A function to add two numbers together and return the result
// // (Amazing I know)
// function add(a,b) {
//     return a + b;
//   }
  
//   // We can create a new variable and ASSIGN the add function to it!
//   let plus = add;
//   // Now the variable "plus" has the add() function inside it
  
//   // And we can then CALL the function inside plus in the usual way!
//   let onePlusOne = plus(1,1); // Call the function inside plus (which is the add() function!)
//   alert(onePlusOne); // 2

  //

//   function hello() {
//     alert(`Hello!`); // Pop up an alert dialog that says "Hello!"
//   }
  
//   setTimeout(hello, 5000); // Call the hello() function after 5000 milliseconds

  //

//   let hello = function () { // Note - ANONYMOUS FUNCTION
//     alert(`Hello!`);
//   };
  
//   setTimeout(hello, 5000); // Call the function inside the hello variable after 5000 milliseconds

  //

  setTimeout(function () {
    alert(`Hello!`)
  }, 5000); // Call the anonymous function provided after 5000 milliseconds