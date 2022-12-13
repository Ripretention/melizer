import {DataSource, MoreThanOrEqual} from "typeorm";
import {UserStatistic, UserStatisticSnapshot} from "../entities";
import {ObjectUtils} from "../Utils";
import {IRepository} from "./IRepository";

export class UserSnapshotRepository implements IRepository<UserStatisticSnapshot> {
	constructor(private readonly source: DataSource) {} 
	private readonly repository = this.source.getRepository(UserStatisticSnapshot);

	public get(userStat: UserStatistic, date?: Date) {
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);

		return this.repository.findOne({
			where: {
				user: {
					id: userStat.user.id
				},
				chat: {
					id: userStat.chat.id
				},
				date: MoreThanOrEqual(date)
			}
		});
	}
	public async create(userStat: UserStatistic) {
		let date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		
		return await this.get(userStat, date)
			? null
			: this.repository.save({ 
				date,
				...ObjectUtils.filterObjectByKey(userStat, k => k !== "id")
			});
	}
}
