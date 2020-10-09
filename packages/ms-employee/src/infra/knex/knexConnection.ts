import Knex from 'knex';
import { singleton } from 'tsyringe';
import * as knexConfig from '@config/knexfile';

export const knexInstance = Knex(knexConfig);

// @singleton()
// export class KnexInstance {
//   private knex: Knex;
//   private config: Knex.Config;
//   constructor() {
//     this.config = knexConfig;
//   }
//   public get KnexConfig() {
//     return this.config;
//   }
//   public get Knex() {
//     return this.knex;
//   }
//   private assertDatabaseConnection = async () => {
//     try {
//       await this.knex.raw('select 1+1 as result');
//     } catch (err) {
//       console.log(
//         '[Fatal] Failed to establish connection to database! Exiting...',
//       );
//       console.log(err);
//       process.exit(1);
//     }
//   };
//   private runMigrations = async () => {
//     console.log('Migration started...');
//     await this.knex.migrate.latest({ loadExtensions: ['.ts'] });
//     console.log('Migration finished...');
//   };
//   public start = async () => {
//     if (this.knex instanceof Knex) return;
//     this.knex = await Knex(this.KnexConfig);
//     await this.runMigrations();
//     await this.assertDatabaseConnection();
//   };
// }

// export const paginateQuery = async <TRecord, TResult>(
//   query: Knex.QueryBuilder<TRecord, TResult>,
//   offset: number,
//   limit: number
// ) => {
//   // Get the total count without offset/limit
//   const [{ count }] = await query.clone().count();
//   // Apply pagination
//   const results = await query.orderBy("id").offset(offset).limit(limit);

//   return {
//     count,
//     results
//   };
// };

// const baseQuery = knex("mytable").where({ foo: "bar" });

// const myPage = await paginateQuery(baseQuery, 2000, 1000);
