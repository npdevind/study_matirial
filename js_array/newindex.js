let array1 = [1, 2, 3];
let array2 = [8, 5, 6];

const array3 = [...array1, ...array2];

const n = [2, 4, 6, 7];

// map
const newArray = n.map((item, index) => {
    return item + 2;
});

// const newNumber = n.filter((item, index, array) => {
//     return item === 2;
// });

// const newNumber = n.some((item, index, array) => {
//     return item > 1;
// });

const newNumber = n.every((item, index, array) => {
    return item < 1;
});

// console.log(newNumber);

function showNumber(...number) {
    return number;
}
console.log(showNumber(2, 4, "sgs", true));

// console.log(showNumber(1, 2, 3, "A", "hello", true, 4.25));
// console.log(showNumber(1, 2));
