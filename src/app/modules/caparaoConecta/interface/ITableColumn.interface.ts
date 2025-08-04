export interface ITableColumn<T> {
  key: string;
  header: string;
  cell?: (item: T) => any;
}
