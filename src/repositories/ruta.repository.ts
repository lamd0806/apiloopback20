import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Aeropuerto, Ruta, RutaRelations} from '../models';
import {AeropuertoRepository} from './aeropuerto.repository';

export class RutaRepository extends DefaultCrudRepository<
  Ruta,
  typeof Ruta.prototype.id,
  RutaRelations
> {

  public readonly origen_aeropuerto: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  public readonly destino_aeropuerto: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  public readonly origenFk: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  public readonly destinoFk: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AeropuertoRepository') protected aeropuertoRepositoryGetter: Getter<AeropuertoRepository>,
  ) {
    super(Ruta, dataSource);
    this.destinoFk = this.createBelongsToAccessorFor('destinoFk', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('destinoFk', this.destinoFk.inclusionResolver);
    this.origenFk = this.createBelongsToAccessorFor('origenFk', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('origenFk', this.origenFk.inclusionResolver);
  }
}
