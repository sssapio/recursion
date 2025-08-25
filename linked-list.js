class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add node to the end
  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  // Add node to the beginning
  prepend(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  // Get list size
  size() {
    return this.length;
  }

  // Get first node
  getHead() {
    return this.head;
  }

  // Get last node
  getTail() {
    return this.tail;
  }

  // Get node at specific index
  at(index) {
    if (index < 0 || index >= this.length) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }

    return current;
  }

  // Remove last element
  pop() {
    if (!this.head) return null;

    let current = this.head;
    let previous = null;

    while (current.nextNode) {
      previous = current;
      current = current.nextNode;
    }

    if (previous) {
      previous.nextNode = null;
      this.tail = previous;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return current;
  }

  // Check if value exists
  contains(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }

    return false;
  }

  // Find index of value
  find(value) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) return index;
      current = current.nextNode;
      index++;
    }

    return null;
  }

  // Convert to string representation
  toString() {
    let result = "";
    let current = this.head;

    while (current) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }

    return result + "null";
  }

  // EXTRA CREDIT: Insert at specific index
  insertAt(value, index) {
    if (index < 0 || index > this.length) return false;

    if (index === 0) {
      this.prepend(value);
      return true;
    }

    if (index === this.length) {
      this.append(value);
      return true;
    }

    const newNode = new Node(value);
    const previous = this.at(index - 1);

    newNode.nextNode = previous.nextNode;
    previous.nextNode = newNode;

    this.length++;
    return true;
  }

  // EXTRA CREDIT: Remove at specific index
  removeAt(index) {
    if (index < 0 || index >= this.length) return null;

    if (index === 0) {
      const removed = this.head;
      this.head = this.head.nextNode;
      if (!this.head) this.tail = null;
      this.length--;
      return removed;
    }

    const previous = this.at(index - 1);
    const removed = previous.nextNode;

    previous.nextNode = removed.nextNode;

    if (index === this.length - 1) {
      this.tail = previous;
    }

    this.length--;
    return removed;
  }
}
