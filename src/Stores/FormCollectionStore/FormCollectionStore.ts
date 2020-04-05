import { action, computed, observable, toJS } from 'mobx';

export class FormCollectionStore<T> {

  @observable
  private _items = new Array<T>();

  private _defaultValue = new Array<T>();

  constructor(items: Array<T> = []) {
    this.insert = this.insert.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.removeAt = this.removeAt.bind(this);
    this.removeRange = this.removeRange.bind(this);
    this.clear = this.clear.bind(this);
    this.contains = this.contains.bind(this);
    this.find = this.find.bind(this);
    this.updateByIndex = this.updateByIndex.bind(this);
    this.setItems = this.setItems.bind(this);
    this.reset = this.reset.bind(this);

    if (items && items.length) {
      this._defaultValue = items;
      this.reset();
    }
  }

  /**
   * Gets items of the list.
   */
  @computed
  public get items(): T[] {
    return this._items;
  }

  /**
   * Gets the number of elements contained in the list.
   */
  @computed
  public get count(): number {
    return this._items.length;
  }

  @computed
  public get isEmpty(): boolean {
    return this._items.length === 0;
  }

  @computed
  public get isNotEmpty(): boolean {
    return this._items.length > 0;
  }

  /**
   * Inserts an element into the list at the specified index.
   *
   * @param index The zero-based index at which item should be inserted.
   * @param item The object to insert.
   */
  @action
  public insert(index: number, item: T): void {
    this._items.splice(index, 0, item);
  }

  /**
   * Set items of the list.
   */
  @action
  public setItems(items: Array<T>): void {
    this._items = items.map(x => toJS(x));
  }

  /**
   * Adds an object to the end of the list.
   *
   * @param item The object to be added to the end of the list.
   */
  @action
  public add(...item: Array<T>): void {
    this._items.push(...item);
  }

  /**
   * Removes the first occurrence of a specific object from the list.
   *
   * @param item he object to remove from the list.
   * @returns true if item is successfully removed; otherwise, false.
   */
  public remove(item: T): boolean {
    const itemIndex = this._items.findIndex((value: T): boolean => (
      value === item
    ));

    if (itemIndex >= 0) {
      this.removeAt(itemIndex);
    }

    return itemIndex >= 0;
  }

  /**
   * Removes the element at the specified index of the list.
   *
   * @param index The zero-based index of the element to remove.
   */
  @action
  public removeAt(index: number): void {
    this._items.splice(index, 1);
  }

  /**
   * Filters elements in the list.
   *
   * @param predicate Callback to find an element in the list.
   */
  public filter(predicate: (value: T) => boolean): void {
    const items = this._items.filter(predicate);
    this.setItems(items);
  }

  /**
   * Removes a range of elements from the list.
   *
   * @param index The zero-based starting index of the range of elements to remove.
   * @param count The number of elements to remove.
   */
  @action
  public removeRange(index: number, count: number): void {
    this._items.splice(index, count);
  }

  /**
   * Removes all elements from the list.
   */
  @action
  public clear(): void {
    this._items = new Array<T>();
  }

  /**
   * Determines whether an element is in the list.
   */
  public contains(item: T): boolean {
    return this._items.some((value: T): boolean => item === value);
  }

  /**
   * Searches for an element that matches the conditions defined by the specified predicate,
   * and returns the first occurrence within the entire list.
   */
  public find(predicate: (this: void, value: T, index: number, obj: Array<T>) => unknown, thisArg?: any): T {
    return this._items.find(predicate, thisArg);
  }

  /**
   * Update the list's element at the given index
   *
   * @param index Given index.
   * @param value New element value.
   */
  @action
  public updateByIndex(index: number, value: T): void {
    this._items[index] = value;
  }

  /**
   * Get item by given index.
   *
   * @param index Given index.
   */
  public getByIndex(index: number): T {
    return this._items[index];
  }

  /**
   * Reset the list to the default value
   */
  public reset(): void {
    this.setItems(this._defaultValue);
  }

  @computed
  public get isNotDefault(): boolean {
    return this._defaultValue !== this._items;
  }

}
