class Stack {
  constructor() {
    this.stack = [];
  }
  append = value => {
    return this.stack.push(value);
  };
  unappend = value => {
    return this.stack.pop();
  };
  size = () => {
    return this.stack.length;
  };
}

export default Stack;
