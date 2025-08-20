function fibsRec(n) {
  if (n < 2) {
    return n;
  } else {
    return fibsRec(n - 1) + fibsRec(n - 2);
  }
}
let output = fibsRec(5);
console.log(output);
