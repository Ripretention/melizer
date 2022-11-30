export interface IRepository<TEntity> {
	get(...args: any[]): Promise<TEntity>;
}
