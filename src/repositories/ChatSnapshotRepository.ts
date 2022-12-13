import {DataSource, MoreThanOrEqual} from "typeorm";
import {ChatStatistic, ChatStatisticSnapshot} from "../entities";
import {ObjectUtils} from "../Utils";
import {IRepository} from "./IRepository";

export class ChatSnapshotRepository implements IRepository<ChatStatisticSnapshot> {
	constructor(private readonly source: DataSource) {} 
	private readonly repository = this.source.getRepository(ChatStatisticSnapshot);

	public get(chatStat: ChatStatistic, date?: Date) {
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);

		return this.repository.findOne({
			where: {
				chat: {
					id: chatStat.chat.id
				},
				date: MoreThanOrEqual(date)
			}
		});
	}
	public async create(chatStat: ChatStatistic) {
		let date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);

		return await this.get(chatStat, date)
			? null
			: this.repository.save({ 
				date,
				...ObjectUtils.filterObjectByKey(chatStat, k => k !== "id")
			});
	}
}
