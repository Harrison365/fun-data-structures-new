function createStack(maxSize = 5) {
  // build your stack object inside this factory function
  const stack = {};
  stack.quantity = 0;
  stack.storage = {};
  stack.maxSize = maxSize;
  stack.push = push;
  stack.pop = pop;
  stack.isEmpty = isEmpty;
  stack.isFull = isFull;
  stack.peek = peek;
  return stack;
}

function push(item) {
  if (this.quantity < this.maxSize) {
    this.quantity++;
    this.storage[this.quantity] = item;
  } else {
    console.log(`cannot add ${item}, storage is full`);
  }
}

function pop() {
  if (Object.keys(this.storage).length > 0) {
    const itemToReturn = this.storage[this.quantity];
    console.log("item to return", itemToReturn);
    delete this.storage[this.quantity];
    this.quantity--;

    return itemToReturn;
  }
}

function isEmpty() {
  return this.quantity === 0;
}

function isFull() {
  return this.quantity === this.maxSize;
}

function peek() {
  return this.storage[this.quantity];
}

module.exports = createStack;
