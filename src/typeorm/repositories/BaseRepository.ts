import { DataSource, DeepPartial, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { IBaseRepository } from "./IBaseRepository";

/**
 * Classe base dos repositórios do banco de dados.
 */
export abstract class BaseRepository<TEntity extends ObjectLiteral, TEntityDTO = DeepPartial<TEntity>> implements IBaseRepository<TEntity, TEntityDTO> {
  protected dataSource: DataSource;
  protected repository: Repository<TEntity>;

  constructor(dataSource: DataSource, target: EntityTarget<TEntity>) {
    this.dataSource = dataSource;
    this.repository = dataSource.getRepository<TEntity>(target);
  }

  /**
   * Obtém o nome da tabela relacionada ao repositório.
   */
  abstract getTableName(): string

  /**
   * Obtém a instância do repositório no TypeORM.
   * @returns Instância do repositório no TypeORM.
   */
  getRepository(): Repository<TEntity> {
    return this.repository;
  }

  /**
   * Obtém a fonte de dados do repositório.
   * @returns Fonte de dados do repositório.
   */
  getDataSource(): DataSource {
    return this.dataSource;
  }

  /**
   * Cria uma nova entidade.
   * @param data Dados da entidade a ser criada.
   * @returns Instância da entidade criada.
   */
  async create(data: TEntityDTO): Promise<TEntity> {
    const entity = await this.repository.save(
      this.repository.create(data as unknown as DeepPartial<TEntity>)
    );

    return entity;
  }

  /**
   * Atualiza uma entidade.
   * @param entity Entidade a ser atualizada.
   * @returns Instância da entidade atualizada.
   */
  async update(entity: TEntity): Promise<TEntity> {
    const savedEntity = await this.repository.save(entity, {
      transaction: false,
    });

    return savedEntity;
  }

  /**
   * Deleta uma entidade.
   * @param id ID da entidade a ser deletada.
   */
  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id } as any);
  }

  /**
   * Obtém uma entidade pelo seu ID.
   * @param id ID da entidade a ser obtida.
   */
  async findById(id: string): Promise<TEntity | null> {
    const entity = await this.repository.findOneBy({ id } as any);
    return entity;
  }

  /**
   * Obtém todas as entidades do banco de dados.
   */
  findAll(): Promise<TEntity[]> {
    return this.repository.find();
  }

  /**
   * Obtém o total de entidades do banco de dados.
   */
  countAll(): Promise<number> {
    return this.repository.count();
  }
}
