import { Model } from 'objection';

export abstract class EntityRepository<T> {
  private model: Model;
  constructor(model: any) {
    if (!model) throw Error('Knex instance is mandatory');
    if (_validateIsModel(model))
      throw Error('Parameter is not an Objection.js model');
    this.model = model;
  }
}
const _validateIsModel = (model: Model): Boolean => {
  let parentClass = Object.getPrototypeOf(model);
  while (parentClass.name !== 'Model' && parentClass.name !== '') {
    parentClass = Object.getPrototypeOf(parentClass);
  }
  if (parentClass.name === 'Model') return true;
  return false;
};
