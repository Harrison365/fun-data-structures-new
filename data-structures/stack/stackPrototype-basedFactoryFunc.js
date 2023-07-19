function Stack(maxSize = 5) {
  // build your stack object inside this constructor function
  const stack = Object.create(stackPrototype);
  stack.quantity = 0;
  stack.storage = {};
  stack.maxSize = maxSize;

  return stack;
}

const stackPrototype = {
  push: function (item) {
    if (this.quantity < this.maxSize) {
      this.quantity++;
      this.storage[this.quantity] = item;
    } else {
      console.log(`cannot add ${item}, storage is full`);
    }
  },

  pop: function () {
    if (Object.keys(this.storage).length > 0) {
      const itemToReturn = this.storage[this.quantity];
      console.log("item to return", itemToReturn);
      delete this.storage[this.quantity];
      this.quantity--;

      return itemToReturn;
    }
  },
  isEmpty: function () {
    return this.quantity === 0;
  },
  isFull: function () {
    return this.quantity === this.maxSize;
  },
  peek: function () {
    return this.storage[this.quantity];
  },
};

const newww = new Stack();

module.exports = Stack;
