export interface BaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  create(data: object): Promise<T>;
  save(data: T): Promise<T>;
}
