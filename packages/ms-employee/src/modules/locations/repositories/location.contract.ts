export interface ILocationRepository {
  findByAddress(address: string): void;
}
