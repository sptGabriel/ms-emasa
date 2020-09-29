// import { RequestContext } from '@mikro-orm/core';
// import { EntityManager } from '@mikro-orm/postgresql';
// import { LocationEntity } from 'locations/domain/location.entity';
// import { LocationDto } from 'locations/infrastucture/location.dto';
// import { AppError } from 'shared/app/BaseError';
// import { Either, left, right } from 'shared/core/eitherHandler';
// import { Service } from 'shared/core/serviceContract';
// import { CONFLICT, CONFLICT_ERRORS } from 'shared/errors/conflictError';
// import { LocationRepositoryImp } from '../infrastucture/repository/location.repository';
// export class CreateLocation
//   implements Service<LocationDto, Promise<Either<AppError, LocationEntity>>> {
//   private repository: LocationRepositoryImp;
//   constructor(entityManager: EntityManager) {
//     this.repository = entityManager.getRepository(LocationEntity);
//   }
//   private throwError = (data: LocationDto): AppError => {
//     const error = new CONFLICT(
//       CONFLICT_ERRORS.locationAlreadyExists(
//         data.stret_address,
//         data.postal_code,
//       ),
//       [
//         {
//           resource: 'Create Location',
//           field: `location`,
//           reason: 'Data already exists',
//           message: `${data.stret_address}, already exists`,
//         },
//       ],
//     );

//     return error;
//   };
//   public execute = async (
//     data: LocationDto,
//   ): Promise<Either<AppError, LocationEntity>> => {
//     const locationAlreadyExist = this.repository.findOne({
//       stret_address: data.stret_address,
//       postal_code: data.postal_code,
//     });
//     if (locationAlreadyExist) left(this.throwError(data));
//     const location = this.repository.create(LocationEntity);
//     await this.repository.persistAndFlush(location);
//     return right(location);
//   };
// }
