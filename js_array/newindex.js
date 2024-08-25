const nums = [1, 2, 3];
const nums2 = [4, 5, 6];

const newArray = nums2.concat(nums);

// console.log(newArray);

// slice

const myArray = ["A", "B", "C", "D", "E"];
const myArraySlice = myArray.slice(1, 4);
// const myArraySlice2 = myArray.slice(-3);

// splice
myArray.splice(0, 2);
// const myArraySlice2 = myArray.splice(1, 0, "F");

// console.log(myArray);
// console.log(myArraySlice2);

// fill

const dummy = [2, 5, 1, 6];

dummy.fill("i", 1, 3);
// console.log(dummy);

// findindex

const no = [1, 2, 3, 4];

const index = no.findIndex((item) => {
    return item === 2;
});
// console.log(index);

const a = [[1, 2], 3, 6, [[5, 9]]];

// console.log(a.flat(2));

// console.log(a.flat(2).reverse());

// sorting

const array = [8, 9, 7, 5, 2, 6, 4, 1, 3];

const assOrderSort = array.sort((a, b) => a - b);
// console.log(assOrderSort);

const descOrderSort = array.sort((a, b) => b - a);
// console.log(descOrderSort);
