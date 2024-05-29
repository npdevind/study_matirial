//for
// array = ["A", "B"];

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
//   console.log(index == 0 ? element : "");
// }

// array.forEach((element) => {
//   return element;
// });

// const data2 = array.map((item, index) => {
//   return item.toLowerCase();
// });

// let array = ["RAM", "SHYAM", "JHON", "MADHU"];
// array.push("NEW");

// const data = array.map((item, index) => {
//   return item.toLowerCase();
// });

// console.log(data);

//function

// const getAge = (dob, name) => {
//   const date = new Date();
//   const getDob = new Date(dob);
//   const age = date - getDob;
//   const ageDate = new Date(age); // Epoch
//   return { name: name, age: Math.abs(ageDate.getUTCFullYear() - 1970) }; // Convert to years
// };

// console.log(getAge("1995-10-10", "Rahul"));

// object

// let user = {
//   // an object
//   name: "John", // by key "name" store value "John"
//   age: 30, // by key "age" store value 30
// };

// // delete user.age;

// console.log(user);

// let array1 = ["1", "2"];
// let array2 = ["1", "2"];

// console.log(array1 == array2);  // false =>  Each array has its own reference in memory

const array = "nil";

console.log(["nil"].includes("nil"));
