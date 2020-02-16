const store = {};

function set(key, value) {
  console.log(key, value);
  store[key] = value;
}

function get(key) {
  return store[key];
}

module.exports = {
  get,
  set
}