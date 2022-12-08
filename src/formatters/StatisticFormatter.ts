import {TgMessageBuilder} from "tg-io";
import {IAttachmentStatistic} from "../types/IAttachmentStatistic";
import {IMessageStatistic} from "../types/IMessageStatistic";
import {UnitFormatter} from "./UnitFormatter";

export class StatisticFormatter {
	public constructor(private readonly unitFormatter: UnitFormatter) {}
	public format(stat: IMessageStatistic & IAttachmentStatistic) {
		let breakline = { text: "\n" };
		let msgStat = this.formatMessageStatistic(stat);
		let attachStat = this.formatAttachmentStatistic(stat);
		return TgMessageBuilder.concat(
			msgStat, 
			breakline,
			attachStat
		);
	}
	public formatMessageStatistic(stat: IMessageStatistic) {
		return TgMessageBuilder.build(f => {
			let format = (n: number) => f.italic(this.unitFormatter.formatNumber(n));
			return [ 
				`✉️ Messages: ${format(stat.messages)}`,
				`😁 Emojis: ${format(stat.emojis)}`,
				`📧 Symbols: ${format(stat.symbols)}`,
				`📥 Words: ${format(stat.words)}`
			].join("\n");
		});
	}
	public formatAttachmentStatistic(stat: IAttachmentStatistic) {
		return TgMessageBuilder.build(f => {
			let format = (n: number) => f.italic(this.unitFormatter.formatNumber(n));
			return [ 
				`📷 Photos: ${format(stat.photos)}`,
				`🎙 Voices: ${format(stat.voices)}`,
				`🖼 Stickers: ${format(stat.stickers)}`,
				`🎥 Videos: ${format(stat.videos)}`,
				`🎙 Audios: ${format(stat.audios)}`,
				`📁 Documents: ${format(stat.documents)}`,
			].join("\n");
		});
	}
}
