import {TgUpdate} from "tg-io";
import {MessageAnalyzer} from "../app/MessageAnalyzer";
import {MessageContext} from "../infrastructure/MessageContext";
import {UserStatisticRepository} from "../repositories/UserStatisticRepository";

export class CalculatingService {
	private readonly msgAnalyzer = new MessageAnalyzer();
	constructor(private readonly userStatRepository: UserStatisticRepository) {}

	@TgUpdate("message")
	public async countMessage(ctx: MessageContext, next: () => void) {
		let msgStat = this.msgAnalyzer.analyze(ctx.text);

		ctx.userStat.messages++;
		ctx.userStat.emojis += msgStat.emojis;
		ctx.userStat.symbols += msgStat.symbols;
		ctx.userStat.words += msgStat.words;

		await this.userStatRepository.save(ctx.userStat);
		next();
	}
}
