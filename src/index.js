"use strict";

class MyArray {
  constructor(...args) {
    this.length = 0;
    for (let i = 0; i < args.length; i++) {
      this.push(args[i]);
    }
  }

  static isMyArray(arr) {
    return arr instanceof MyArray;
  }
}

MyArray.prototype.push = function (...args) {
  if (args) {
    for (let i = 0; i < args.length; i++) {
      this[this.length++] = args[i];
    }
    return this.length;
  }
};

MyArray.prototype.pop = function () {
  if (this.length === 0) {
    return;
  }
  const last_item = this.length - 1;
  delete this[last_item];
  return last_item;
};

MyArray.prototype.forEach = function (func) {
  if (typeof func !== "function") {
    throw new TypeError("Callback must be a function");
  }
  for (let i = 0; i < this.length; i++) {
    func(this[i], i, this);
  }
};

MyArray.prototype.concat = function (...arrs) {
  let newMass = new MyArray();
  this.forEach((el) => {
    newMass.push(el);
  });
  for (let i = 0; i < arrs.length; i++) {
    if (Array.isArray(arrs[i])) {
      newMass.push(...arrs[i]);
    } else if (MyArray.isMyArray(arrs[i])) {
      for (let j = 0; j < arrs[i].length; j++) {
        newMass.push(arrs[i][j]);
      }
    } else {
      newMass.push(arrs[i]);
    }
  }
  return newMass;
};

MyArray.prototype.flat = function (depth = 1) {
  let newArr = new MyArray();

  this.forEach((el) => {
    if (MyArray.isMyArray(el) && depth > 0) {
      newArr = newArr.concat(el.flat(depth - 1));
    } else if (el !== undefined) {
      newArr.push(el);
    }
  });

  return newArr;
};

const arr1 = new MyArray(
  0,
  1,
  new MyArray(2, new MyArray(3, new MyArray(4, 5)))
);
console.log(arr1.flat());
const depht = Infinity;
console.log(arr1.flat(depht));
