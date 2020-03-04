class Stack {
  constructor() {
    this.stack = [];
  }
  append = value => {
    return this.stack.push(value);
  };
  unappend = () => {
    return this.stack.pop();
  };
  size = () => {
    return this.stack.length;
  };
  tail = () => {
    return this.stack[this.stack.length - 1];
  };
}

export default Stack;
