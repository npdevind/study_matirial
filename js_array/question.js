const arr = [12, 35, 1, 10, 34, 34];
const arr2 = [10, 5, 10];
const arr3 = [2];
// 1, 10, 12, 34, 35;

// function secondLarge(arr) {
//     let l = arr.length;
//     const sort = arr.sort((a, b) => a - b);
//     const v = sort.slice(-3);
//     return v[0];
// }

function secondLarge(arr) {
    const uniqueArr = Array.from(new Set(arr));
    uniqueArr.sort((a, b) => {
        return b - a;
    });
    console.log(uniqueArr);

    if (uniqueArr.length >= 2) return uniqueArr[1];
    else return -1;
}

console.log(secondLarge(arr));
