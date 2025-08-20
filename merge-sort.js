function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));

  return merge(left, right);

  function merge(left, right) {
    const result = [];
    let i = 0,
      j = 0;

    while ((i, left.length && j < right.length)) {
      result.push(left[i] < right[j] ? left[i++] : right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}
let output = mergeSort([105, 79, 100, 110]);
console.log(output);
