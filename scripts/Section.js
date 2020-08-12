class Section{
  constructor({items, renderer}, selector){
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems(){
    this._items.forEach((item) => {
      this._renderer(item);
      console.log(item);
    });
  }

  addItem(item) {
    this._selector.prepend(item);
  }
}

export {Section}