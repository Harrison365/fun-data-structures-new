function Stack(maxSize = 5) {
  // build your stack object inside this constructor function

  this.quantity = 0;
  this.storage = {};
  this.maxSize = maxSize;
}

Stack.prototype.push = function (item) {
  if (this.quantity < this.maxSize) {
    this.quantity++;
    this.storage[this.quantity] = item;
  } else {
    console.log(`cannot add ${item}, storage is full`);
  }
};

Stack.prototype.pop = function () {
  if (Object.keys(this.storage).length > 0) {
    const itemToReturn = this.storage[this.quantity];
    console.log("item to return", itemToReturn);
    delete this.storage[this.quantity];
    this.quantity--;

    return itemToReturn;
  }
};

Stack.prototype.isEmpty = function () {
  return this.quantity === 0;
};

Stack.prototype.isFull = function () {
  return this.quantity === this.maxSize;
};

Stack.prototype.peek = function () {
  return this.storage[this.quantity];
};

module.exports = Stack;
