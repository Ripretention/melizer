export interface IRepository<TEntity> {
	get(id: string): TEntity;
}
