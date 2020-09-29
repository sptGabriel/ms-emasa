import { AggregateRoot } from './aggregate-root';

export abstract class WriterRepository<
  AggregateRootType extends AggregateRoot<AggregateRootType>,
  WriteModelType extends WriteModel
> {
  private EntityManager: EntityManager;
  protected readonly repository: EntityRepository<WriteModelType>;
  constructor(context: RequestContext) {
    this.EntityManager = context.em;
  }
}
