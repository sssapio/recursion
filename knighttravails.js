function knightMoves(start, end) {
  // Possible knight moves (relative to current position)
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  // Check if position is valid (within 0-7 chessboard)
  function isValid(position) {
    const [x, y] = position;
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  // BFS to find shortest path
  const queue = [[start]];
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    // If we reached the destination
    if (current[0] === end[0] && current[1] === end[1]) {
      return path;
    }

    // Explore all possible moves
    for (const move of moves) {
      const nextX = current[0] + move[0];
      const nextY = current[1] + move[1];
      const nextPosition = [nextX, nextY];

      if (isValid(nextPosition) && !visited.has(nextPosition.toString())) {
        visited.add(nextPosition.toString());
        const newPath = [...path, nextPosition];
        queue.push(newPath);
      }
    }
  }

  // If no path found (shouldn't happen on a chessboard)
  return null;
}

// Enhanced version with pretty output
function knightMovesWithOutput(start, end) {
  const path = knightMoves(start, end);

  if (!path) {
    console.log("No path found!");
    return;
  }

  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((position) => console.log(`  [${position}]`));

  return path;
}

// Test cases
console.log("=== Knight Moves Tests ===");

// Test 1: Simple move
console.log("\nTest 1: [0,0] to [1,2]");
knightMovesWithOutput([0, 0], [1, 2]);

// Test 2: Multiple paths possible
console.log("\nTest 2: [0,0] to [3,3]");
knightMovesWithOutput([0, 0], [3, 3]);

// Test 3: Reverse direction
console.log("\nTest 3: [3,3] to [0,0]");
knightMovesWithOutput([3, 3], [0, 0]);

// Test 4: Longer path
console.log("\nTest 4: [0,0] to [7,7]");
knightMovesWithOutput([0, 0], [7, 7]);

// Test 5: From the example
console.log("\nTest 5: [3,3] to [4,3]");
knightMovesWithOutput([3, 3], [4, 3]);

// Test 6: Edge case - same position
console.log("\nTest 6: [4,4] to [4,4]");
knightMovesWithOutput([4, 4], [4, 4]);

// Test 7: Edge of board
console.log("\nTest 7: [0,0] to [7,0]");
knightMovesWithOutput([0, 0], [7, 0]);
