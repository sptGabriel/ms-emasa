import { UniqueEntityID } from './unique-entityID';
import { PrimaryColumn } from 'typeorm';

export abstract class Model implements EntityProperties {
  @PrimaryColumn('uuid')
  id: UniqueEntityID;
}
