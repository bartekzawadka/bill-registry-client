import {OptionItem} from './OptionItem';

export class OptionSet<T> {
  public SelectedValue: T;
  public Options: Array<OptionItem<T>>;
}
