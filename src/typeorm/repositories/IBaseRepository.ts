import { DataSource, ObjectLiteral, Repository } from "typeorm";

/**
 * Interface base dos repositórios.
 */
export interface IBaseRepository<TEntity extends ObjectLiteral, TEntityDTO = Partial<TEntity>> {
  /**
   * Obtém o nome da tabela relacionada ao repositório.
   */
  getTableName(): string;

  /**
   * Cria uma nova entidade.
   * @param data Dados da entidade a ser criada.
   * @returns Instância da entidade criada.
   */
  create(data: TEntityDTO): Promise<TEntity>;

  /**
   * Atualiza uma entidade.
   * @param entity Entidade a ser atualizada.
   * @returns Instância da entidade atualizada.
   */
  update(entity: TEntity): Promise<TEntity>;

  /**
   * Deleta uma entidade.
   * @param id ID da entidade a ser deletada.
   */
  deleteById(id: string): Promise<void>;

  /**
   * Obtém uma entidade pelo seu ID.
   * @param id ID da entidade a ser obtida.
   */
  findById(id: string): Promise<TEntity | null>;

  /**
   * Obtém todas as entidades do banco de dados.
   */
  findAll(): Promise<TEntity[]>;

  /**
   * Obtém a instância do repositório no TypeORM.
   * @returns Instância do repositório no TypeORM.
   */
  getRepository(): Repository<TEntity>;

  /**
   * Obtém a fonte de dados do repositório.
   * @returns Fonte de dados do repositório.
   */
  getDataSource(): DataSource;

  /**
   * Obtém o total de entidades do banco de dados.
   */
  countAll(): Promise<number>;
}
