const createStack = require("./stackFactory");

describe("createStack", () => {
  it("should return an object with the correct default values", () => {
    const testStack = createStack();
    expect(testStack).toEqual(
      expect.objectContaining({
        quantity: 0,
        storage: {},
        maxSize: 5,
      })
    );
  });
  it("should set the max size to be equal to first argument passed", () => {
    const testStack = createStack(10);
    expect(testStack.maxSize).toBe(10);
  });
  describe(".push()", () => {
    it("should add item to storage", () => {
      const testStack = createStack();
      testStack.push("🍍");
      expect(testStack.storage).toEqual({ 1: "🍍" });
    });
    it("should increase quantity when an item is added", () => {
      const testStack = createStack();
      testStack.push("🍍");
      testStack.push("🍐");
      expect(testStack.quantity).toBe(2);
      //expect(testStack.storage).toEqual({ 1: "🍍", 2: "🍐" });
    });
    it("should be able to add multiple items up until maxSize reached", () => {
      const testStack = createStack(2);
      testStack.push("🍍");
      testStack.push("🍐");
      expect(testStack.storage).toEqual({
        1: "🍍",
        2: "🍐",
      });
      testStack.push("👻");
      expect(testStack.storage).toEqual({
        1: "🍍",
        2: "🍐",
      });
      expect(testStack.quantity).toBe(2);
    });
  });
  describe(".pop()", () => {
    it("should return undefined on an empty stack", () => {
      const testStack = createStack();
      expect(testStack.pop()).toBe(undefined);
    });
    it("should return single removed item when stack contains one item", () => {
      const testStack = createStack();
      testStack.push("🏖️");
      const removedItem = testStack.pop();
      expect(removedItem).toBe("🏖️");
      expect(testStack.storage).toEqual({});
    });
    it("should return last item pushed on stack when multiple items are on stack", () => {
      const testStack = createStack();
      testStack.push("🏖️");
      testStack.push("🏐");
      const removedItem = testStack.pop();
      expect(removedItem).toBe("🏐");
      expect(testStack.storage).toEqual({ 1: "🏖️" });
    });
    it("should not reduce quantity when nothing is removed", () => {
      const testStack = createStack();
      expect(testStack.quantity).toBe(0);
      testStack.pop();
      expect(testStack.quantity).toBe(0);
    });
  });
  describe(".isEmpty()", () => {
    it("should return true when stack is empty", () => {
      const testStack = createStack();
      expect(testStack.isEmpty()).toBe(true);
    });
    it("should return false when stack has items in storage", () => {
      const testStack = createStack();
      testStack.push("🥯");
      expect(testStack.isEmpty()).toBe(false);
    });
    it("should return to true when last item is popped from storage", () => {
      const testStack = createStack();
      testStack.push("🥯");
      testStack.pop();
      expect(testStack.isEmpty()).toBe(true);
    });
  });
  describe(".isFull()", () => {
    it("should return false when the items in storage are fewer than the maxSize", () => {
      const testStack = createStack(99);
      expect(testStack.isFull()).toBe(false);
    });
    it("should return true when maxSize is reached", () => {
      const testStack = createStack(2);
      testStack.push("1️⃣");
      testStack.push("2️⃣");
      expect(testStack.isFull()).toBe(true);
    });
    it("should flip boolean if item is popped from stack after storage is full", () => {
      const testStack = createStack(2);
      testStack.push("1️⃣");
      testStack.push("2️⃣");
      testStack.pop();
      expect(testStack.isFull()).toBe(false);
    });
  });
  describe(".peek()", () => {
    it("should return undefined if stack is empty", () => {
      const testStack = createStack();
      expect(testStack.peek()).toBeUndefined();
    });
    it("should return top item of stack", () => {
      const testStack = createStack();
      testStack.push("a");
      testStack.push("b");
      testStack.push("c");
      expect(testStack.peek()).toBe("c");
    });
  });
});
