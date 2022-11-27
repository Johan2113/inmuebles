import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, TipoInmueble} from '../models';
import {TipoInmuebleRepository} from './tipo-inmueble.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype._id,
  InmuebleRelations
> {

  public readonly tipoInmueble: BelongsToAccessor<TipoInmueble, typeof Inmueble.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TipoInmuebleRepository') protected tipoInmuebleRepositoryGetter: Getter<TipoInmuebleRepository>,
  ) {
    super(Inmueble, dataSource);
    this.tipoInmueble = this.createBelongsToAccessorFor('tipoInmueble', tipoInmuebleRepositoryGetter,);
    this.registerInclusionResolver('tipoInmueble', this.tipoInmueble.inclusionResolver);
  }
}
