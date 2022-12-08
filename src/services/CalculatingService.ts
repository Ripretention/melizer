import {TgUpdate} from "tg-io";
import {MessageAnalyzer} from "../app/MessageAnalyzer";
import {MessageContext} from "../infrastructure/MessageContext";
import {ChatStatisticRepository} from "../repositories/ChatStatisticRepository";
import {UserStatisticRepository} from "../repositories/UserStatisticRepository";
import {IAttachmentStatistic} from "../types/IAttachmentStatistic";
import {IMessageStatistic} from "../types/IMessageStatistic";

export class CalculatingService {
	private readonly msgAnalyzer = new MessageAnalyzer();
	constructor(
		private readonly userStatRepository: UserStatisticRepository,
		private readonly chatStatRepository: ChatStatisticRepository
	) {}

	@TgUpdate("message")
	public async calculate(ctx: MessageContext, next: () => void) {
		let uStat = this.countMessage(ctx.text, ctx.userStat);
		uStat = this.countMessageAttachments(ctx, ctx.userStat);
		uStat.lastActivity = new Date(ctx.date * 1e3);
		await this.userStatRepository.save(uStat);

		let cStat = this.countMessage(ctx.text, ctx.chatStat);
		cStat = this.countMessageAttachments(ctx, ctx.chatStat);
		cStat.lastActivity = new Date(ctx.date * 1e3);
		await this.chatStatRepository.save(cStat);
		next();
	}
	private countMessage<T extends IMessageStatistic>(text: string, stat: T): T {
		let msgStat = this.msgAnalyzer.analyze(text);

		stat.messages++;
		stat.emojis += msgStat.emojis;
		stat.symbols += msgStat.symbols;
		stat.words += msgStat.words;

		return stat;
	}
	private countMessageAttachments<T extends IAttachmentStatistic>(ctx: MessageContext, stat: T): T {
		let attachments = ["photo", "audio", "voice", "document", "video", "sticker"] as const;
		for (let attachment of attachments) {
			if (ctx[attachment] == null || (attachment === "photo" && !ctx[attachment].length))
				continue;
			stat[attachment + "s"]++;
		}

		return stat;
	}
}
