class Node<T> {
  data: T;
  next: null | Node<T>;

  constructor(initData: T) {
    this.data = initData;
    this.next = null;
  }
}

export class LinkedList<T> {
  currentIteration: Node<T>;
  first: Node<T>;
  last: Node<T>;

  append(data: T) {
    const newNode = new Node(data);
    this.last.next = newNode;
    this.last = newNode;
  }

  next() {
    if (this.currentIteration.next) {
      this.currentIteration = this.currentIteration.next;
    }
  }

  reset() {
    if (this.first) {
      this.currentIteration;
    }
  }

  constructor(initData: T) {
    this.currentIteration = new Node(initData);
    this.last = this.currentIteration;
    this.first = this.currentIteration;
  }
}
