import {TgCommand, TgMessageBuilder} from "tg-io";
import {MessageContext} from "../infrastructure/MessageContext";
import {StatisticFormatter} from "../formatters";

export class UserStatisticService {
	constructor(private readonly statFormatter: StatisticFormatter) {}

	@TgCommand(/^\/stat/)
	public async sendMessageStatistic(ctx: MessageContext) {
		let appeal = TgMessageBuilder.build(f => "📊 Message statistic of " + f.bold(ctx.sender.appeal) + ":\n");
		await ctx.replyMessage(TgMessageBuilder.concat(
			appeal,
			this.statFormatter.format(ctx.userStat)
		));
	}
}
