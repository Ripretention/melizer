import {TgEvent} from "tg-io";
import {MessageContext} from "../infrastructure/MessageContext";
import {ChatSnapshotRepository, UserSnapshotRepository} from "../repositories";

export class SnapshotService {
	private readonly timeouts: Record<string, Date> = {};
	constructor(
		private readonly userSnapshotRepository: UserSnapshotRepository,
		private readonly chatSnapshotRepository: ChatSnapshotRepository
	) {}
	@TgEvent("chat")
	public async createSnapshot(ctx: MessageContext, next: () => void) {
		let currentDate = new Date();
		currentDate.setSeconds(0);
		currentDate.setMinutes(0);
		currentDate.setHours(0);

		let chatTimeoutId = ctx.chat.id.toString();
		if (!this.timeouts[chatTimeoutId] || currentDate > this.timeouts[chatTimeoutId]) {
			this.timeouts[chatTimeoutId] = new Date();
			await this.chatSnapshotRepository.create(ctx.chatStat);
		}
		let userTimeoutId = `${ctx.chat.id}-${ctx.sender.id}`;
		if (!this.timeouts[userTimeoutId] || currentDate > this.timeouts[userTimeoutId]) {
			this.timeouts[userTimeoutId] = new Date();
			await this.userSnapshotRepository.create(ctx.userStat);
		}

		next();
	}
}
