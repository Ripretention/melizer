import {TgUpdateHandler} from "tg-io";
import {UserStatisticRepository} from "../repositories/UserStatisticRepository";

export class AuthService {
	constructor(private readonly userStatRepository: UserStatisticRepository) {}
	public serve(onMessageEvent: InstanceType<typeof TgUpdateHandler>["onMessageEvent"]) {
		onMessageEvent("chat", async (ctx, next) => {
			let userStat = await this.userStatRepository.get(ctx.sender.id, ctx.chat.id);
			if (!userStat)
				userStat = await this.userStatRepository.create(ctx.sender, ctx.chat);

			next();
		});
		return;
	}
}
