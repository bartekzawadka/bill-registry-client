export class OptionItem<T> {
  readonly Title: string;
  readonly Value: T;

  constructor(title: string, value: T) {
    this.Title = title;
    this.Value = value;
  }
}
