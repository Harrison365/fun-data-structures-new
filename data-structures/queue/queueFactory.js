function createQueue(maxSize = 5) {
  const queue = {};

  queue.front = 0;
  queue.back = 0;
  queue.storage = {};
  queue.maxSize = maxSize;
  queue.enQueue = enQueue;
  queue.deQueue = deQueue;
  queue.getQuantity = getQuantity;
  queue.isEmpty = isEmpty;
  queue.isFull = isFull;
  queue.peek = peek;
  return queue;
}

//add to end of queue
function enQueue(item) {
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
}

//remove from start of queue e.g. {1:"apple", 2:"banana", 3:"orange"} => {2:"banana", 3:"orange"}
function deQueue() {
  const itemToReturn = this.storage[this.front];
  delete this.storage[this.front];
  this.front++;
  if (this.front > this.back) {
    this.front = 0;
    this.back = 0;
  }
  return itemToReturn;
}
function getQuantity() {
  if (!this.front || !this.back) return 0;
  else return this.back - this.front + 1;
}
function isEmpty() {
  return this.front === 0 && this.back === 0;
}
function isFull() {
  return this.getQuantity() === this.maxSize;
}
function peek() {
  if (!this.isEmpty()) {
    return this.storage[this.front];
  }
}

module.exports = createQueue;
