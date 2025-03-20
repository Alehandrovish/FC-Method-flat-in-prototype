"use strict";

class MyArray {
  constructor(...agrs) {
    this.length = 0;
    for (let i = 0; i < agrs.length; i++) {
      this.push(agrs[i]);
    }
  }
  push(...agrs) {
    if (agrs) {
      for (let i = 0; i < agrs.length; i++) {
        this[this.length++] = agrs[i];
      }
      return this.length;
    } else {
      let err = new RangeError("args is not exist");
      return err;
    }
  }
  pop() {
    if (this.length === 0) {
      return;
    }
    const last_item = this.length - 1;
    delete this[last_item];
    return last_item;
  }
  forEach(func) {
    if (typeof func !== "function") {
      return -1;
    }
    for (let i = 0; i < this.length; i++) {
      func(this[i], i, this);
    }
  }
  concat(...arrs) {
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
  }
  static isMyArray(arr) {
    return arr instanceof MyArray;
  }

  flat(depht = 1) {
    const newArr = new MyArray();
    if (MyArray.isMyArray(this)) {
      this.forEach((el) => {
        if (Array.isArray(el) && depht > 0) {
          newArr.push(...el.flat(depht - 1));
        } else {
          newArr.push(el);
        }
      });
      return newArr;
    }
  }
}

const arr1 = new MyArray(0, 1, [2, [3, [4, 5]]]);
console.log(arr1.flat());
const depht = Infinity;
console.log(arr1.flat(depht));
