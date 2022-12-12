import {readFile} from "fs/promises";
import {TgCommand, TgCommandInfo, TgMessageBuilder} from "tg-io";
import {MessageContext} from "../infrastructure/MessageContext";

export class InfoService {
	@TgCommandInfo("info", "get information about bot")
	@TgCommand(/^\/info$/i)
	public async sendInfo(ctx: MessageContext) {
		let lastCommit = (await readFile(".git/refs/heads/master")).toString().trim();
		let message = TgMessageBuilder.build(f => [
			`Last commit: ${f.code("#" + lastCommit)}`,
			`Repository: ${f.textLink("github", "https://github.com/Ripretention/melizer")}`
		].join("\n"));
		return ctx.sendMessage(message);
	}

	@TgCommand(/^\/ping$/i)
	public sendPing(ctx: MessageContext) {
		return ctx.replyMessage("pong!");
	}
}
