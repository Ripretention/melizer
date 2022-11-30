import {TgEntity, TgUpdateHandler} from "tg-io";

type UseType = InstanceType<typeof TgUpdateHandler>["use"];
export class LoggingService {
	public serve(use: UseType) {
		use(this.log);
	}
	private log: Parameters<UseType>[0] = (upd, next) => {
		let events = Object.keys(upd)
			.filter(k => k !== "update_id")
			.join(", ");

		console.log(`[${this.formatDate()}] ${events} | ${this.getMessageData(upd)}`);
		next();
	};

	private getMessageData(upd: TgEntity.IUpdateResult) {
		let msg: TgEntity.IMessage;
		if (upd.message)
			msg = upd.message;
		else if (upd?.callback_query?.message)
			msg = upd.callback_query.message;
		else 
			return "";

		let payload = msg?.text ?? msg?.caption ?? "empty";
		return `${msg.from.id}-${msg.from.frist_name} -> ${payload}`;
	}
	private formatDate() {
		let date = new Date();
		return `${date.getHours()}:${date.getSeconds()}:${date.getSeconds()}`;
	}
}
