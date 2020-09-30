export interface BaseRepository<T> {
  find(Data: Object): Promise<T>;
  findAll(): Promise<T>;
  create(Data: Object): Promise<T>;
  delete(Data: Object): Promise<T>;
  update(data: Object): Promise<T>;
}
