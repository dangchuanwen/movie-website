
let list = ['dcw', 'dcw', 'abc'];
let arr = [];
arr = list.reduce((prev, cur) => {
  if (arr.findIndex(item => item === cur) === -1) {
    prev.push(cur);
  }
  return prev;
}, arr);

console.log(arr);