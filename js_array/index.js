const myArray = [1, 2, 3, 4, 5];

//add and remove element in last index
myArray.push(6);
myArray.pop();

//add and remove element in first index
myArray.unshift(6);
myArray.shift();

// console.log(myArray);

/************************************ LOOP *****************************************/

const myNewArray = ["A", "B", "C", "D"];

for (let i = 0; i < myNewArray.length; i++) {
    const element = myNewArray[i];
    // console.log(element);
}
let i = 0;
while (i < myNewArray.length) {
    // console.log(myNewArray[i]);
    i++;
}
///************************************ In build LOOP IN JS *****************************************///
// map:
const number = [1, 2, 3, 4, 5];
// const newNumber = number.map((item, index, array) => {
//     return item + 2;
// });
// console.log(newNumber);

//filter
// const newNumber = number.filter((item, index, array) => {
//     return item > 2;
// });
// console.log(newNumber);

//reduce
const sum = number.reduce((prev, item) => {
    // console.log(prev, item);
    // console.log("--" + prev);
    return prev + item; // 0+1+2+3
}, 0);
// console.log(sum);

//some
// const newNumber = number.some((item, index, array) => {
//     return item > 1;
// });
// console.log(newNumber);

// every
// const newNumber = number.every((item, index, array) => {
//     return item >= 1;
// });
// console.log(newNumber);

//find
const newNumber = number.find((item, index, array) => {
    return item > 5;
});
// console.log(newNumber);

/*************************************** spread and rest operators *****************************************************/

const nums = [1, 2, 3];
const nums2 = [4, 5, 6];

let newArray = [...nums, ...nums2]; //spread

//rest
function showNumber(...number) {
    return number;
}
console.log(showNumber(1, 2, 3, "A", "hello", true, 4.25));
console.log(showNumber(1, 2));
