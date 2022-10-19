function Queue(maxSize = 5) {
  const queue = Object.create(queuePrototype);

  queue.front = 0;
  queue.back = 0;
  queue.storage = {};
  queue.maxSize = maxSize;

  return queue;
}

const queuePrototype = {
  enQueue: function (item) {
    if (this.back === 0) {
      this.back = 1;
      this.front = 1;
      this.storage[this.back] = item;
    } else {
      const quantity = this.getQuantity();
      if (quantity < this.maxSize) {
        this.back++;
        this.storage[this.back] = item;
      }
    }
  },

  deQueue: function () {
    const itemToReturn = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;
    if (this.front > this.back) {
      this.front = 0;
      this.back = 0;
    }
    return itemToReturn;
  },
  getQuantity: function () {
    if (!this.front || !this.back) return 0;
    else return this.back - this.front + 1;
  },
  isEmpty: function () {
    return this.front === 0 && this.back === 0;
  },
  isFull: function () {
    return this.getQuantity() === this.maxSize;
  },
  peek: function () {
    if (!this.isEmpty()) {
      return this.storage[this.front];
    }
  },
};

module.exports = createQueue;
