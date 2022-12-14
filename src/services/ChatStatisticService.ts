import {TgCommand, TgCommandInfo, TgMessageBuilder} from "tg-io";
import {MessageContext} from "../infrastructure/MessageContext";
import {StatisticFormatter} from "../formatters";

export class ChatStatisticService {
	constructor(private readonly statFormatter: StatisticFormatter) {}

	@TgCommandInfo("chatstat", "get chat statistic")
	@TgCommand(/^\/chatstat/)
	public async sendMessageStatistic(ctx: MessageContext) {
		let appeal = TgMessageBuilder.build(() => "📊 Chat message statistic:\n");
		await ctx.replyMessage(TgMessageBuilder.concat(
			appeal,
			this.statFormatter.format(ctx.chatStat)
		));
	}
}
