import {TgEvent, TgModel} from "tg-io";
import {MessageContext} from "../infrastructure/MessageContext";
import {ChatStatisticRepository} from "../repositories/ChatStatisticRepository";
import {UserStatisticRepository} from "../repositories/UserStatisticRepository";

export class AuthService {
	constructor(
		private readonly userStatRepository: UserStatisticRepository,
		private readonly chatStatRepository: ChatStatisticRepository
	) {}

	@TgEvent("chat")
	public async auth(ctx: MessageContext, next: () => void) {
		if (!ctx.chat)
			return;

		ctx.chatStat = await this.authChat(ctx.chat);
		ctx.userStat = await this.authUser(ctx.sender, ctx.chat);

		next();
	}
	private async authChat(chat: TgModel.Chat) {
		let chatStat = await this.chatStatRepository.get(chat.id);
		if (!chatStat)
			chatStat = await this.chatStatRepository.create(chat);

		return chatStat;
	}
	private async authUser(user: TgModel.User, chat: TgModel.Chat) {
		let userStat = await this.userStatRepository.get(user.id, chat.id);
		if (!userStat)
			userStat = await this.userStatRepository.create(user, chat);

		return userStat;
	}
}
