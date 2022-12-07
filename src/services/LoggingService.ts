import {TgEntity, TgUse} from "tg-io";

export class LoggingService {
	@TgUse()
	public log(upd: TgEntity.IUpdateResult, next: () => void) {
		let events = Object.keys(upd)
			.filter(k => k !== "update_id")
			.join(", ");

		console.log(`[${this.formatDate()}] ${events} | ${this.getMessageData(upd)}`);
		next();
	}

	private getMessageData(upd: TgEntity.IUpdateResult) {
		let msg: TgEntity.IMessage;
		if (upd.message)
			msg = upd.message;
		else if (upd?.callback_query?.message)
			msg = upd.callback_query.message;
		else 
			return "";

		let payload = msg?.text ?? msg?.caption ?? "empty";
		return `${msg.from.id}-${msg.from.first_name} -> ${payload}`;
	}
	private formatDate() {
		let date = new Date();
		let pad = (n: number) => n.toString().padStart(2, "0");
		return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
	}
}
