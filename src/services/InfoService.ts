import {TgUpdateHandler} from "tg-io";

export class InfoService {
	public serve(hearCommand: InstanceType<typeof TgUpdateHandler>["hearCommand"]) {
		hearCommand(/^\/ping/i, async ctx => {
			await ctx.replyMessage("pong!");
		});
	}
}
