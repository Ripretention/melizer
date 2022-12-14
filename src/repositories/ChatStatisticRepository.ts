import {TgModel} from "tg-io";
import {DataSource} from "typeorm";
import {IRepository} from "./IRepository";
import {Chat, ChatStatistic} from "../entities";

export class ChatStatisticRepository implements IRepository<ChatStatistic> {
	constructor(private readonly source: DataSource) {}

	private chatRepository = this.source.getRepository(Chat);
	private chatStatRepository = this.source.getRepository(ChatStatistic);

	public async get(id: number) {
		return this.chatStatRepository.findOne({
			where: {
				chat: { id }
			},
			relations: ["chat"]
		});
	}
	public async create(originChat: TgModel.Chat) {
		let chat = new Chat();
		chat.id = originChat.id;

		let chatStat = new ChatStatistic();
		chatStat.chat = chat;

		await this.chatRepository.save(chat);
		await this.chatStatRepository.save(chatStat);

		return chatStat;
	}
	public save(chatStat: ChatStatistic) {
		return this.chatStatRepository.save(chatStat);
	}
}
