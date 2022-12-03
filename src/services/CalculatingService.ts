import {TgUpdateHandler} from "tg-io";
import {MessageAnalyzer} from "../app/MessageAnalyzer";
import {MessageContext} from "../MessageContext";
import {UserStatisticRepository} from "../repositories/UserStatisticRepository";

type OnUpdateType = InstanceType<typeof TgUpdateHandler>["onUpdate"];
export class CalculatingService {
	private readonly msgAnalyzer = new MessageAnalyzer();
	constructor(private readonly userStatRepository: UserStatisticRepository) {}
	public serve(onUpdate: OnUpdateType) {
		onUpdate<MessageContext>("message", async (ctx, next) => {
			await this.countMessage(ctx);
			next();
		});
	}

	public async countMessage(ctx: MessageContext) {
		let msgStat = this.msgAnalyzer.analyze(ctx.text);

		ctx.userStat.messages++;
		ctx.userStat.emojis += msgStat.emojis;
		ctx.userStat.symbols += msgStat.symbols;
		ctx.userStat.words += msgStat.words;

		await this.userStatRepository.save(ctx.userStat);
		return;
	}
}
