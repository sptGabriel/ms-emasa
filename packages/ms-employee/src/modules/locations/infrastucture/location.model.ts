import { Model } from 'objection';

export class LocationModel extends Model {
  static get tableName() {
    return 'locations';
  }
}
