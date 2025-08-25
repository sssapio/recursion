class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    // Initialize all buckets as empty arrays
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
  }

  // Hash function with modulo applied during iteration to prevent overflow
  hash(key) {
    if (typeof key !== "string") {
      throw new Error("HashMap only supports string keys");
    }

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      // Apply modulo during iteration to prevent integer overflow
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  // Set key-value pair
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists in bucket
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // Update existing key
        bucket[i][1] = value;
        return;
      }
    }

    // Add new key-value pair
    bucket.push([key, value]);
    this.size++;

    // Check if resizing is needed
    if (this.shouldResize()) {
      this.resize();
    }
  }

  // Get value by key
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    return null;
  }

  // Check if key exists
  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }

    return false;
  }

  // Remove key-value pair
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  // Return number of stored keys
  length() {
    return this.size;
  }

  // Clear all entries
  clear() {
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
    this.size = 0;
  }

  // Return array of all keys
  keys() {
    const keysArray = [];

    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keysArray.push(key);
      }
    }

    return keysArray;
  }

  // Return array of all values
  values() {
    const valuesArray = [];

    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        valuesArray.push(value);
      }
    }

    return valuesArray;
  }

  // Return array of all key-value pairs
  entries() {
    const entriesArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entriesArray.push(entry);
      }
    }

    return entriesArray;
  }

  // Check if resizing is needed
  shouldResize() {
    return this.size / this.capacity > this.loadFactor;
  }

  // Resize the hash map
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    // Initialize new buckets
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }

    // Rehash all existing entries
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}
