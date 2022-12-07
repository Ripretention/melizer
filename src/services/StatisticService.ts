import {TgCommand, TgMessageBuilder} from "tg-io";
import {MessageContext} from "../infrastructure/MessageContext";
import {StatisticFormatter, UnitFormatter} from "../formatters";

export class StatisticService {
	private readonly statisticFormatter = new StatisticFormatter(new UnitFormatter());
	@TgCommand(/^\/stat/)
	public async sendMessageStatistic(ctx: MessageContext) {
		let appeal = TgMessageBuilder.build(f => "📊 Message statistic of " + f.bold(ctx.sender.appeal) + ":\n");
		await ctx.replyMessage(TgMessageBuilder.concat(
			appeal,
			this.statisticFormatter.formatMessageStatistic(ctx.userStat)
		));
	}
}
