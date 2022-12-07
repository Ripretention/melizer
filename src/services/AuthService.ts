import {TgEvent} from "tg-io";
import {MessageContext} from "../infrastructure/MessageContext";
import {UserStatisticRepository} from "../repositories/UserStatisticRepository";

export class AuthService {
	constructor(private readonly userStatRepository: UserStatisticRepository) {}

	@TgEvent("chat")
	public async authUser(ctx: MessageContext, next: () => void) {
		let userStat = await this.userStatRepository.get(ctx.sender.id, ctx.chat.id);
		if (!userStat)
			userStat = await this.userStatRepository.create(ctx.sender, ctx.chat);

		ctx.userStat = userStat;
		next();
	}
}
