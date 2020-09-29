export interface BaseRepository<T> {
  findAll(): Promise<T[]>;
  findOne(value: string): Promise<T | undefined>;
  create(data: object): Promise<T>;
  update(entity: T): Promise<T>;
  delete(entity: T): Promise<T>;
  save(entity: T): Promise<T>;
}
