import {TgCommand} from "tg-io";
import {MessageContext} from "../infrastructure/MessageContext";

export class InfoService {
	@TgCommand(/^\/ping$/i)
	public sendPing(ctx: MessageContext) {
		return ctx.replyMessage("pong!");
	}
}
