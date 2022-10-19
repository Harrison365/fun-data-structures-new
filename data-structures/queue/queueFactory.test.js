const createQueue = require("./queueFactory");

describe("createQueue", () => {
  it("returned object should have all default values", () => {
    const testQueue = createQueue();
    expect(testQueue).toHaveProperty("front", 0);
    expect(testQueue).toHaveProperty("back", 0);
    expect(testQueue).toHaveProperty("storage", {});
    expect(testQueue).toHaveProperty("maxSize", 5);
  });
  it("maxSize should be set equal to value passed as first argument", () => {
    const testQueue = createQueue(10);
    expect(testQueue.maxSize).toBe(10);
  });
  describe(".enQueue", () => {
    it("should add an single item to empty storage", () => {
      const testQueue = createQueue();
      testQueue.enQueue("one");
      expect(testQueue.storage).toEqual({ 1: "one" });
    });
    it("should add multiple items, updating the back pointer each time", () => {
      const testQueue = createQueue();
      testQueue.enQueue("one");
      testQueue.enQueue("two");
      testQueue.enQueue("three");
      expect(testQueue.back).toBe(3);
      expect(testQueue.storage).toEqual({ 1: "one", 2: "two", 3: "three" });
    });
    it("should not add any more items after maxSize reached", () => {
      const testQueue = createQueue(2);
      testQueue.enQueue("one");
      testQueue.enQueue("two");
      testQueue.enQueue("do not add me");
      expect(testQueue.back).toBe(2);
      expect(testQueue.storage).toEqual({ 1: "one", 2: "two" });
    });
  });
  describe(".deQueue", () => {
    it("should remove first item in queue and returns it", () => {
      const testQueue = createQueue();
      testQueue.enQueue("one");
      const removedItem = testQueue.deQueue();
      expect(removedItem).toBe("one");
      expect(testQueue.storage).toEqual({});
    });
    it("should work with multiple invocations", () => {
      const testQueue = createQueue();
      testQueue.enQueue("one");
      testQueue.enQueue("two");
      testQueue.enQueue("three");
      testQueue.deQueue();
      expect(testQueue.storage).toEqual({ 2: "two", 3: "three" });
      testQueue.deQueue();
      testQueue.deQueue();
      expect(testQueue.storage).toEqual({});
    });
    it("should update front property and reset when it matches back (when empty)", () => {
      const testQueue = createQueue();
      testQueue.enQueue("one");
      testQueue.enQueue("two");
      expect(testQueue.front).toBe(1);
      testQueue.deQueue();
      expect(testQueue.front).toBe(2);
      testQueue.deQueue();
      expect(testQueue.front).toBe(0);
    });
  });
  describe(".getQuantity", () => {
    it("should return 0 when there are no items in the queue", () => {
      const testQueue = createQueue();
      expect(testQueue.getQuantity()).toBe(0);
    });
    it("should return correct number when items are added to the queue", () => {
      const testQueue = createQueue();
      testQueue.enQueue("one");
      expect(testQueue.getQuantity()).toBe(1);
      testQueue.enQueue("two");
      testQueue.enQueue("three");
      expect(testQueue.getQuantity()).toBe(3);
    });
  });
  describe(".isEmpty", () => {
    it("should return true when queue is empty", () => {
      const testQueue = createQueue();
      expect(testQueue.isEmpty()).toBe(true);
    });
    it("should return false when items are in queue", () => {
      const testQueue = createQueue();
      testQueue.enQueue("one");
      expect(testQueue.isEmpty()).toBe(false);
    });
    it("should switch back to true when last item is dequeued", () => {
      const testQueue = createQueue();
      testQueue.enQueue("one");
      testQueue.deQueue();
      expect(testQueue.isEmpty()).toBe(true);
    });
  });
  describe(".isFull", () => {
    it("should return false when items in storage are fewer than maxSize", () => {
      const testQueue = createQueue(5);
      expect(testQueue.isFull()).toBe(false);
    });
    it("should return true when storage limit is reached", () => {
      const testQueue = createQueue(3);
      testQueue.enQueue("one");
      expect(testQueue.isFull()).toBe(false);
      testQueue.enQueue("two");
      testQueue.enQueue("three");
      expect(testQueue.isFull()).toBe(true);
    });
    it("should switch back to false when item is dequeued", () => {
      const testQueue = createQueue(3);
      testQueue.enQueue("one");
      testQueue.enQueue("two");
      testQueue.enQueue("three");
      testQueue.deQueue();
      expect(testQueue.isFull()).toBe(false);
    });
  });
  describe(".peek", () => {
    it("should return undefined when queue is empty", () => {
      const testQueue = createQueue();
      expect(testQueue.peek()).toBe(undefined);
    });
    it("should return item in front of queue", () => {
      const testQueue = createQueue();
      testQueue.enQueue("one");
      expect(testQueue.peek()).toBe("one");
      testQueue.enQueue("two");
      expect(testQueue.peek()).toBe("one");
      testQueue.deQueue();
      expect(testQueue.peek()).toBe("two");
    });
  });
});
