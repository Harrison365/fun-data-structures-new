function createSet() {
  const set = new Set();
  set.setArray = [];

  set.add = add;
  return set;
}

const ourSet = createSet();
console.log(ourSet);

function add(item) {
  if (!this.setArray.includes(item)) {
    this.setArray.push(item);
  }
}

ourSet.add("dog");
ourSet.add("dog");
ourSet.add("cat");
ourSet.add("horse");
ourSet.add("dog");
console.log(ourSet);
