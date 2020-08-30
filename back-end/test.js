
function query() {
  return new Promise(resolve => {
    const n = Math.random();
    if (n < 0.5) {
      console.log('重新')
      resolve(query());
    } else {
      resolve('hello');
    }
  });
}

const p = query();
p.then(data => {
  console.log(data);
})