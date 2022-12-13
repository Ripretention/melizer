import {TgModel} from "tg-io";
import {DataSource} from "typeorm";
import {Chat, User, UserStatistic} from "../entities";
import {IRepository} from "./IRepository";

export class UserStatisticRepository implements IRepository<UserStatistic> {
	constructor(private readonly source: DataSource) {}

	private userRepostiory = this.source.getRepository(User);
	private chatRepository = this.source.getRepository(Chat);
	private userStatRepository = this.source.getRepository(UserStatistic);

	public async get(id: number, chatId: number) {
		return this.userStatRepository.findOne({
			where: {
				user: {
					id
				},
				chat: {
					id: chatId
				}
			}
		});
	}
	public async create(originUsr: TgModel.User, originChat: TgModel.Chat) {
		let user = new User();
		user.id = originUsr.id;
		user.username = originUsr.username;

		let chat = new Chat();
		chat.id = originChat.id;

		let userStatistic = new UserStatistic();
		userStatistic.user = user;
		userStatistic.chat = chat;

		await this.userRepostiory.save(user);
		await this.chatRepository.save(chat);
		await this.userStatRepository.save(userStatistic);

		return userStatistic;
	}
	public save(userStat: UserStatistic) {
		return this.userStatRepository.save(userStat);
	}
}
