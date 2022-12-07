import {TgMessageBuilder} from "tg-io";
import {IMessageStatistic} from "../types/IMessageStatistic";
import {UnitFormatter} from "./UnitFormatter";

export class StatisticFormatter {
	public constructor(private readonly unitFormatter: UnitFormatter) {}
	public format(stat: IMessageStatistic) {
		return this.formatMessageStatistic(stat);
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
}
