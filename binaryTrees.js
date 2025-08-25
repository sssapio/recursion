class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // Build balanced BST from sorted array
  buildTree(array) {
    // Remove duplicates and sort
    const sortedUnique = [...new Set(array)].sort((a, b) => a - b);
    return this._buildTreeRecursive(sortedUnique, 0, sortedUnique.length - 1);
  }

  _buildTreeRecursive(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this._buildTreeRecursive(array, start, mid - 1);
    node.right = this._buildTreeRecursive(array, mid + 1, end);

    return node;
  }

  // Insert value
  insert(value) {
    this.root = this._insertRecursive(this.root, value);
  }

  _insertRecursive(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this._insertRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this._insertRecursive(node.right, value);
    }

    return node;
  }

  // Delete value
  deleteItem(value) {
    this.root = this._deleteRecursive(this.root, value);
  }

  _deleteRecursive(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this._deleteRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteRecursive(node.right, value);
    } else {
      // Node with only one child or no child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Node with two children: get inorder successor (smallest in right subtree)
      node.data = this._minValue(node.right);
      node.right = this._deleteRecursive(node.right, node.data);
    }

    return node;
  }

  _minValue(node) {
    let minValue = node.data;
    while (node.left !== null) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  }

  // Find node with value
  find(value) {
    return this._findRecursive(this.root, value);
  }

  _findRecursive(node, value) {
    if (node === null) return null;
    if (node.data === value) return node;

    return value < node.data
      ? this._findRecursive(node.left, value)
      : this._findRecursive(node.right, value);
  }

  // Level order traversal (BFS)
  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    if (this.root === null) return;

    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  // In-order traversal
  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    this._inOrderRecursive(this.root, callback);
  }

  _inOrderRecursive(node, callback) {
    if (node === null) return;

    this._inOrderRecursive(node.left, callback);
    callback(node);
    this._inOrderRecursive(node.right, callback);
  }

  // Pre-order traversal
  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    this._preOrderRecursive(this.root, callback);
  }

  _preOrderRecursive(node, callback) {
    if (node === null) return;

    callback(node);
    this._preOrderRecursive(node.left, callback);
    this._preOrderRecursive(node.right, callback);
  }

  // Post-order traversal
  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    this._postOrderRecursive(this.root, callback);
  }

  _postOrderRecursive(node, callback) {
    if (node === null) return;

    this._postOrderRecursive(node.left, callback);
    this._postOrderRecursive(node.right, callback);
    callback(node);
  }

  // Height of node
  height(value) {
    const node = this.find(value);
    if (node === null) return null;
    return this._heightRecursive(node);
  }

  _heightRecursive(node) {
    if (node === null) return -1;

    const leftHeight = this._heightRecursive(node.left);
    const rightHeight = this._heightRecursive(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Depth of node
  depth(value) {
    return this._depthRecursive(this.root, value, 0);
  }

  _depthRecursive(node, value, currentDepth) {
    if (node === null) return null;
    if (node.data === value) return currentDepth;

    if (value < node.data) {
      return this._depthRecursive(node.left, value, currentDepth + 1);
    } else {
      return this._depthRecursive(node.right, value, currentDepth + 1);
    }
  }

  // Check if tree is balanced
  isBalanced() {
    return this._isBalancedRecursive(this.root) !== -1;
  }

  _isBalancedRecursive(node) {
    if (node === null) return 0;

    const leftHeight = this._isBalancedRecursive(node.left);
    const rightHeight = this._isBalancedRecursive(node.right);

    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Rebalance tree
  rebalance() {
    const values = [];
    this.inOrderForEach((node) => values.push(node.data));
    this.root = this.buildTree(values);
  }

  // Utility method to get all values in order (for testing)
  getValuesInOrder() {
    const values = [];
    this.inOrderForEach((node) => values.push(node.data));
    return values;
  }

  getValuesPreOrder() {
    const values = [];
    this.preOrderForEach((node) => values.push(node.data));
    return values;
  }

  getValuesPostOrder() {
    const values = [];
    this.postOrderForEach((node) => values.push(node.data));
    return values;
  }

  getValuesLevelOrder() {
    const values = [];
    this.levelOrderForEach((node) => values.push(node.data));
    return values;
  }
}

// Pretty print function (provided)
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
